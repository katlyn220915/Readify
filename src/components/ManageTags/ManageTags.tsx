"use client";

import React, { useState } from "react";
import styles from "./ManageTags.module.css";
import ActionIcon from "../ActionIcon/ActionIcon";

import { faTrashCan, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import useTag from "@/hooks/createTag/useTag";
import TagProps from "@/types/TagProps";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";

export default function ManageTags() {
  const { allUserTags } = useTag();
  console.log(allUserTags);

  return (
    <div
      className={styles.manageTags_field}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className={styles.tags}>
        {allUserTags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </ul>
      <div></div>
    </div>
  );
}

const Tag = ({ tag }: { tag: TagProps }) => {
  const { deleteTag, updateTagName } = useTag();
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [text, setText] = useState(tag.name);

  return (
    <li className={styles.tag}>
      {isEditModeOpen && (
        <input
          type="text"
          value={text}
          className={styles.input}
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
      )}
      {!isEditModeOpen && (
        <input
          type="text"
          defaultValue={text}
          className={styles.input}
          readOnly
        />
      )}
      <div className={styles.tag_actions}>
        {isEditModeOpen && (
          <ActionIcon
            iconProp={faCheck}
            promptText="Save"
            position="top"
            showPrompt={false}
            onAction={() => {
              updateTagName(tag.id, tag.name, text);
              setIsEditModeOpen(false);
            }}
            color="green-400"
          />
        )}
        {!isEditModeOpen && (
          <ActionIcon
            iconProp={faPen}
            promptText="edit"
            position="top"
            showPrompt={false}
            onAction={() => {
              setIsEditModeOpen(true);
            }}
          />
        )}

        <ActionIcon
          iconProp={faTrashCan}
          promptText="delete"
          position="top"
          showPrompt={false}
          onAction={() => {
            deleteTag(tag.id, tag.name);
          }}
        />
      </div>
    </li>
  );
};
