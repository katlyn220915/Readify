"use client";

import { useCallback, useEffect, useState } from "react";
import useFirestore from "../firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";
import TagProps from "@/types/TagProps";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  onCreateTag,
  onDeleteTag,
  onUpdateTag,
  setAllUserTags,
} from "@/lib/redux/features/moreActionSlice";

const useTag = () => {
  const firestore = useFirestore();
  const firestoreCached = useCallback(useFirestore, [useFirestore]);
  const { user }: { user: any } = useAuth();
  const dispatch = useAppDispatch();

  const { allUserTags } = useAppSelector((state) => state.moreAction);

  useEffect(() => {
    const getUserTags = async () => {
      if (user) {
        const data = await firestoreCached().searchByQuery(
          `/users`,
          "email",
          "==",
          user.email
        );
        dispatch(setAllUserTags(data[0].tags));
      }
    };

    getUserTags();
  }, [dispatch, user, firestoreCached]);

  const createTag = async (id: string, name: string) => {
    try {
      await firestoreCached().updateDocument(`/users/`, user.uid, {
        tags: arrayUnion({
          id,
          name,
        }),
      });
      dispatch(onCreateTag({ id, name }));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTag = async (id: string, name: string) => {
    try {
      await firestore.updateDocument(`/users/`, user.uid, {
        tags: arrayRemove({
          id,
          name,
        }),
      });
      dispatch(onDeleteTag(id));
    } catch (e) {
      console.error(e);
    }
  };

  const addTagToBook = async (bookId: string, id: string, name: string) => {
    try {
      await firestore.updateDocument(`/users/${user.uid}/books`, bookId, {
        tags: arrayUnion({
          id,
          name,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTagFromBookCached = useCallback(
    async (bookId: string, data: any) => {
      try {
        await firestoreCached().updateDocument(
          `/users/${user.uid}/books`,
          bookId,
          {
            tags: data,
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    [firestoreCached, user.uid]
  );

  const updateTagNameFromBookCached = useCallback(
    async (bookId: string, id: string, oldName: string, newName: string) => {
      try {
        await firestoreCached().updateDocument(
          `/users/${user.uid}/books`,
          bookId,
          {
            tags: arrayRemove({
              id,
              name: oldName,
            }),
          }
        );
        await firestoreCached().updateDocument(
          `/users/${user.uid}/books`,
          bookId,
          {
            tags: arrayUnion({
              id,
              name: newName,
            }),
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    [user.uid, firestoreCached]
  );

  const updateTagName = async (
    id: string,
    oldName: string,
    newName: string
  ) => {
    try {
      await firestore.updateDocument("/users/", user.uid, {
        tags: arrayRemove({
          id,
          name: oldName,
        }),
      });
      await firestore.updateDocument("/users/", user.uid, {
        tags: arrayUnion({
          id,
          name: newName,
        }),
      });
      dispatch(onUpdateTag({ id, name: newName }));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    allUserTags,
    createTag,
    addTagToBook,
    deleteTagFromBookCached,
    deleteTag,
    updateTagName,
    updateTagNameFromBookCached,
  };
};

export default useTag;
