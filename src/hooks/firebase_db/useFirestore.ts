import app from "../../lib/firebase/initialize";
import { Firestore, getFirestore } from "firebase/firestore";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const useFirestore = () => {
  const setDocument = async (
    collectionName: string,
    documentName: string,
    data: any
  ) => {
    try {
      await setDoc(doc(db, collectionName, documentName), data);
      console.info("Firestore: Already Set Document ");
      return true;
    } catch (e) {
      // throw new Error("Firestore Set Data Error: " + e);
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
        console.info("Document data :", docSnap.data());
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

  return { setDocument, getDocuments, deleteDocument, getDocumentById };
};

export default useFirestore;
