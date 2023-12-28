"use client";
import React, { useState } from "react";
import styles from "./Editor.module.css";

import { useCurrentEditor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import ActionIcon from "../ActionIcon/ActionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faParagraph,
  faListUl,
  faListOl,
  faCode,
  faRotateBackward,
  faRotateForward,
  faQuoteLeft,
  faChevronDown,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Prompt from "../Prompt/Prompt";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "right", "center"],
  }),
];

const content = ``;

const Editor = ({ isNotebookOpen }: { isNotebookOpen: boolean }) => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.container} ${
          isNotebookOpen ? "" : styles.notebook_close
        }`}
      >
        {isNotebookOpen && (
          <div className={styles.wrapper}>
            <span className={styles.toggle_icon}>
              <ActionIcon
                iconProp={isToolbarOpen ? faXmark : faBars}
                promptText={isToolbarOpen ? "Close toolbar" : "Open toolbar"}
                position="left"
                showPrompt={isToolbarOpen ? false : true}
                onAction={() => setIsToolbarOpen(!isToolbarOpen)}
              />
            </span>
            {isToolbarOpen && (
              <>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`${
                    editor.isActive("bold") ? styles.is_active : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`${
                    editor.isActive("italic") ? styles.is_active : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`${
                    editor.isActive("strike") ? styles.is_active : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`${
                    editor.isActive("underline") ? styles.is_active : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faAlignRight} />
                </button>
                <button
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`${
                    editor.isActive("paragraph") ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faParagraph} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 1 })
                      ? styles.is_active
                      : ""
                  } ${styles.tiptap_btn}`}
                >
                  h1
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 2 })
                      ? styles.is_active
                      : ""
                  } ${styles.tiptap_btn}`}
                >
                  h2
                </button>

                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`${
                    editor.isActive("bulletList") ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faListUl} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`${
                    editor.isActive("orderedList") ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faListOl} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`${
                    editor.isActive("codeBlock") ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faCode} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`${
                    editor.isActive("blockquote") ? "is-active" : ""
                  } ${styles.tiptap_btn}`}
                >
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </button>
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                  className={styles.tiptap_btn}
                >
                  <FontAwesomeIcon icon={faRotateBackward} />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                  className={styles.tiptap_btn}
                >
                  <FontAwesomeIcon icon={faRotateForward} />
                </button>
              </>
            )}
          </div>
        )}

        <EditorContent editor={editor} className={styles.text_area} />
      </div>
    </>
  );
};
export default Editor;
