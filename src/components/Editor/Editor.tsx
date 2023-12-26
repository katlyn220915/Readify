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
} from "@fortawesome/free-solid-svg-icons";

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

const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <>
        <div className={styles.wrapper}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faBold}
              promptText="Bold"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faItalic}
              promptText="Italicize"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faStrikethrough}
              promptText="Strike-through"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faUnderline}
              promptText="Underline"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <span>|</span>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <ActionIcon
              iconProp={faAlignLeft}
              promptText="Align Left"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <ActionIcon
              iconProp={faAlignCenter}
              promptText="Align Center"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <ActionIcon
              iconProp={faAlignRight}
              promptText="Align Right"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <span>|</span>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faParagraph}
              promptText="Paragraph"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? styles.is_active : ""
            }
          >
            h1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? styles.is_active : ""
            }
          >
            h2
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faListUl}
              promptText="Bullet List"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faListOl}
              promptText="Ordered List"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faCode}
              promptText="Code block"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? styles.is_active : ""}
          >
            <ActionIcon
              iconProp={faQuoteLeft}
              promptText="Block Quote"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <span>|</span>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <ActionIcon
              iconProp={faRotateBackward}
              promptText="Undo"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <ActionIcon
              iconProp={faRotateForward}
              promptText="Redo"
              position="bottom"
              showPrompt={true}
              onAction={() => {}}
            />
          </button>
        </div>
      </>
      <EditorContent editor={editor} className={styles.text_area} />
    </>
  );
};
export default Editor;
