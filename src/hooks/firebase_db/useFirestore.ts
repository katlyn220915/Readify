import app from "../../lib/firebase/initialize";

import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

const useFirestore = () => {
  const db = getFirestore(app);
  const setDocument = async (
    collectionName: string,
    documentName: string,
    data: any
  ) => {
    try {
      await setDoc(doc(db, collectionName, documentName), data, {
        merge: true,
      });
      console.info("Firestore: Already Set Document ");
      return true;
    } catch (e) {
      throw new Error("Firestore Set Data Error: " + e);
      return false;
    }
  };

  const getDocuments = async (path: string) => {
    let data: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, path));
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    } catch (e) {
      throw new Error("Firestore get Documents Error: " + e);
    }
    return data;
  };

  const deleteDocument = async (path: string) => {
    try {
      await deleteDoc(doc(db, path));
      return true;
    } catch (e) {
      // throw new Error("Firestore delete Document Error: " + e);
      console.error("Firestore error" + e);
      return false;
    }
  };

  const getDocumentById = async (path: string, bookId: string) => {
    try {
      const docRef = doc(db, path, bookId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.info("Document data :", docSnap.data());
        const data = docSnap.data();
        return data;
      } else {
        console.info("No such document");
        return null;
      }
    } catch (e) {
      console.error("Firestore error", e);
      return null;
    }
  };

  const updateDocument = async (
    collectionName: string,
    documentName: string,
    data: any
  ) => {
    try {
      const ref = doc(db, collectionName, documentName);
      await updateDoc(ref, data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteColumn = async (
    collectionName: string,
    documentName: string,
    deleteColumnId: string
  ) => {
    try {
      const ref = doc(db, collectionName, documentName);
      await updateDoc(ref, {
        [deleteColumnId]: deleteField(),
      });
    } catch (e) {
      console.error("Firebase Error: ", e);
    }
  };

  const getDocsByObj = async (path: string) => {
    const querySnapshot = await getDocs(collection(db, path));
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({
        [doc.id]: doc.data(),
      });
    });
    return data;
  };

  const searchByQuery = async (
    path: string,
    field: string,
    operator: any,
    value: any
  ) => {
    try {
      const q = query(collection(db, path), where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (e) {
      console.error("Firebase error: ", e);
    }
  };

  return {
    setDocument,
    getDocuments,
    deleteDocument,
    getDocumentById,
    updateDocument,
    deleteColumn,
    getDocsByObj,
    searchByQuery,
  };
};

export default useFirestore;
