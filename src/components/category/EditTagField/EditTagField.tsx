"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";

import TagAction from "@/components/common/TagAction/TagAction";
import useTag from "@/hooks/createTag/useTag";
import { useAppSelector } from "@/hooks/redux/hooks";
import TagProps from "@/types/TagProps";

import CreateTagBtn from "../CreateTagBtn/CreateTagBtn";
import styles from "./EditTagField.module.css";

const EditTagField = ({
  tags,
  onAddTag,
  bookId,
}: {
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
  bookId: string;
}) => {
  const { allUserTags } = useAppSelector((state) => state.tag);
  const [newTagText, setNewTagText] = useState("");
  const [searchTagList, setSearchTagList] = useState<any>([]);

  const { createTag, addTagToBook, deleteTagFromBookCached } = useTag();

  const allArr = tags.map((cur) => cur.id);
  const myRef = useRef(allUserTags.filter((cur) => !allArr.includes(cur.id)));
  const tagNameRef = useRef(allUserTags.map((cur) => cur.name));

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
      deleteTagFromBookCached(
        bookId,
        tags.filter((cur) => cur.id !== tag.id)
      );
      onAddTag((tags) => tags.filter((cur) => cur.id !== tag.id));
      myRef.current = [
        ...myRef.current,
        { id: tag.id, name: tag.textContent.replace("x", "") },
      ];
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
          <TagAction
            onAction={handleDeleteTag}
            tag={tag}
            key={tag.id}
            mode="delete"
          />
        ))}
        {tags.length < 5 && (
          <div className={styles.select_tags_field_input_wrapper}>
            <input
              className={styles.select_tags_field_input}
              placeholder={"Search or create a tag"}
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
              autoFocus
            />
          </div>
        )}
      </div>
      {newTagText && (
        <div className={styles.tag_options}>
          {tags.length === 5 && <p>A book can have a maximum of five tags.</p>}
          {searchTagList &&
            searchTagList.map((tag: TagProps) => (
              <TagAction
                onAction={handleAddTag}
                key={tag.id}
                tag={tag}
                mode="add"
              />
            ))}
          {tags.length < 5 &&
            searchTagList.length > 0 &&
            searchTagList[0].name !== newTagText &&
            newTagText && (
              <CreateTagBtn
                onCreateTag={handleCreateTag}
                newTagText={newTagText}
              />
            )}
          {searchTagList.length === 0 &&
            newTagText &&
            !tagNameRef.current.includes(newTagText) && (
              <CreateTagBtn
                onCreateTag={handleCreateTag}
                newTagText={newTagText}
              />
            )}
        </div>
      )}
    </>
  );
};

export default EditTagField;
