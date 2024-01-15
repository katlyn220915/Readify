"use client";

import React, { useState, Dispatch, SetStateAction, useRef } from "react";
import styles from "./EditTagField.module.css";

import TagProps from "@/types/TagProps";
import useTag from "@/hooks/createTag/useTag";
import { useAppSelector } from "@/hooks/redux/hooks";

const EditTagField = ({
  tags,
  onAddTag,
  bookId,
}: {
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
  bookId: string;
}) => {
  const { allUserTags } = useAppSelector((state) => state.moreAction);
  const { createTag, addTagToBook, deleteTagFromBook } = useTag();
  const [newTagText, setNewTagText] = useState("");
  const [searchTagList, setSearchTagList] = useState<any>([]);
  const myRef = useRef(allUserTags);

  const handleAddTag = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (tags && tags.length > 5) return;
    const newTag = e.target as HTMLElement;
    if (newTag && newTag.textContent && newTag.id) {
      addTagToBook(bookId, newTag.id, newTag.textContent);
      if (tags.length === 0) {
        onAddTag([
          {
            name: newTag.textContent!,
            id: newTag.id,
          },
        ]);
      } else {
        onAddTag((prev) => [
          ...prev,
          {
            name: newTag.textContent!,
            id: newTag.id,
          },
        ]);
      }
      myRef.current = myRef.current.filter((cur) => cur.id !== newTag.id);
      setNewTagText("");
      setSearchTagList([]);
    }
  };

  const handleDeleteTag = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let tag = e.target as HTMLElement;
    if (!tag.id) {
      tag = tag.parentElement as HTMLElement;
    }
    if (tag && tag.id && tag.textContent) {
      deleteTagFromBook(
        bookId,
        tags.filter((cur) => cur.id !== tag.id)
      );
      onAddTag((tags) => tags.filter((cur) => cur.id !== tag.id));
      setSearchTagList([]);
    }
  };

  const handleCreateTag = async () => {
    if (tags && tags.length > 5) return;
    if (tags) {
      const timestemp = String(Date.now());
      onAddTag((prev) => [
        ...prev,
        {
          name: newTagText,
          id: timestemp,
        },
      ]);
      setNewTagText("");
      setSearchTagList([]);
      createTag(timestemp, newTagText);
      addTagToBook(bookId, timestemp, newTagText);
    }
  };

  return (
    <>
      <div className={styles.select_tags_field}>
        {tags?.map((tag) => (
          <button key={tag.id} onClick={(e) => handleDeleteTag(e)} id={tag.id}>
            <span>{tag.name}</span>
            <span>x</span>
          </button>
        ))}
        <div className={styles.select_tags_field_input_wrapper}>
          <input
            className={styles.select_tags_field_input}
            placeholder={tags?.length === 0 ? "Search or create a tag" : ""}
            onChange={(e) => {
              if (e.target.value === newTagText) {
                setSearchTagList([]);
                return;
              }
              setNewTagText(e.target.value);
              if (allUserTags) {
                setSearchTagList(
                  myRef.current.filter((cur) =>
                    cur.name.includes(e.target.value)
                  )
                );
              } else {
                setSearchTagList([]);
              }
            }}
            value={newTagText}
          />
        </div>
      </div>
      <div className={styles.tag_options}>
        {searchTagList &&
          searchTagList.map((tag: TagProps) => (
            <button key={tag.id} onClick={(e) => handleAddTag(e)} id={tag.id}>
              {tag.name}
            </button>
          ))}
        {searchTagList.length === 0 && newTagText && (
          <p
            className={styles.btn_create_tag}
            onClick={() => handleCreateTag()}
          >
            <span>Create tag</span>
            <span className={styles.new_tag}>{newTagText}</span>
          </p>
        )}
        {searchTagList[0] !== undefined &&
          searchTagList[0].name !== newTagText &&
          newTagText && (
            <p
              className={styles.btn_create_tag}
              onClick={() => handleCreateTag()}
            >
              <span>Create tag</span>
              <span className={styles.new_tag}>{newTagText}</span>
            </p>
          )}
      </div>
    </>
  );
};

export default EditTagField;
