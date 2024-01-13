"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import styles from "./EditTagField.module.css";

import { usePathname } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { onCreateTags } from "@/lib/redux/features/moreActionSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";

const EditTagField = ({
  tags,
  onAddTag,
  bookId,
}: {
  tags: string[] | null;
  onAddTag: Dispatch<SetStateAction<string[]>>;
  bookId: string;
}) => {
  const { allTags } = useAppSelector((state) => state.moreAction);
  const [newTagText, setNewTagText] = useState("");
  const [searchTagList, setSearchTagList] = useState<any>();

  const pathname = usePathname();
  const category = pathname.split("/").pop();
  const firestore = useFirestore();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const handleAddTag = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (tags && tags.length > 5) return;
    const newTag = e.target as HTMLElement;
    if (newTag && newTag.textContent) {
      onAddTag((prev) => {
        const newTagContent = newTag.textContent;
        if (newTagContent !== null) {
          return [...prev, newTagContent];
        }
        return prev;
      });
      setNewTagText("");
      setSearchTagList(null);
      if (category !== undefined && tags) {
        await firestore.updateDocument(
          `/users/${user.uid}/${category}`,
          bookId,
          {
            tags: [...tags, newTag.textContent],
          }
        );
        await firestore.updateDocument(
          `/users/${user.uid}/tags/`,
          newTag.textContent,
          {
            [bookId]: `users/${user.uid}/${category}/${bookId}`,
          }
        );
      }
    }
  };

  const handleDeleteTag = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newTag = e.target as HTMLElement;
    if (newTag && newTag.textContent) {
      onAddTag((prev) => [...prev.filter((cur) => cur !== newTag.textContent)]);
      setSearchTagList(null);
    }
    firestore.updateDocument(`/users/${user.uid}/${category}`, bookId, {
      tags: tags?.filter((cur) => cur !== newTag.textContent),
    });
  };

  const handleCreateTag = async () => {
    if (tags && tags.length > 5) return;
    if (tags) {
      onAddTag((prev) => [...prev, newTagText]);
      setNewTagText("");
      dispatch(onCreateTags(newTagText));
      setSearchTagList(null);
      if (allTags === undefined) {
        firestore.updateDocument(`/users/`, user.uid, {
          tags: [newTagText],
        });
      } else {
        firestore.updateDocument(`/users/`, user.uid, {
          tags: [...allTags, newTagText],
        });
      }
      firestore.updateDocument(`/users/${user.uid}/${category}`, bookId, {
        tags: [...tags, newTagText],
      });
      firestore.setDocument(`/users/${user.uid}/tags`, newTagText, {
        [bookId]: `/users/${user.uid}/${category}/${bookId}`,
      });
    }
  };

  return (
    <>
      <div className={styles.select_tags_field}>
        {tags?.map((tag, i) => (
          <button key={`${i}${tag}`} onClick={(e) => handleDeleteTag(e)}>
            <span>{tag}</span>
            <span>x</span>
          </button>
        ))}
        <div className={styles.select_tags_field_input_wrapper}>
          <input
            className={styles.select_tags_field_input}
            placeholder={tags?.length === 0 ? "Search or create a tag" : ""}
            onChange={(e) => {
              if (e.target.value === newTagText) {
                setSearchTagList(null);
                return;
              }
              setNewTagText(e.target.value);
              if (allTags) {
                setSearchTagList(
                  allTags.filter(
                    (cur) =>
                      cur.includes(e.target.value) && !tags?.includes(cur)
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
          searchTagList.map((tag: string, i: number) => (
            <button key={`${tag}${i}`} onClick={(e) => handleAddTag(e)}>
              {tag}
            </button>
          ))}
        {searchTagList && searchTagList[0] !== newTagText && newTagText && (
          <p
            className={styles.btn_create_tag}
            onClick={() => handleCreateTag()}
          >
            <span>Create tag</span>
            <span className={styles.new_tag}>{newTagText}</span>
          </p>
        )}
        {!searchTagList && <p>No tags</p>}
      </div>
    </>
  );
};

export default EditTagField;
