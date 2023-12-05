import app from "../../lib/firebase/initialize";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);
const storage = getStorage(app);

const useFirestore = () => {
  const setDocument = async (
    collectionName: string,
    documentName: string,
    data: any
  ) => {
    try {
      await setDoc(doc(db, collectionName, documentName), data);
      console.info("Firestore: Already Set Document ");
    } catch (e) {
      throw new Error("Firestore Set Data Error: " + e);
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
      console.error(e);
    }
    return data;
  };

  const deleteDocument = async (path: string) => {
    try {
      await deleteDoc(doc(db, path));
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteFiles = async (path: string) => {
    try {
      const desertRefImg = ref(storage, path + ".png");
      const desertRefEpub = ref(storage, path + ".epub");

      const isImgDeleted = await deleteObject(desertRefImg)
        .then(() => {
          console.log("deleted IMG");
          return true;
        })
        .catch((error) => {
          console.error(
            "Firebase error: Uh-oh, an error occurred when deleting objects..." +
              error
          );
          return false;
        });

      const isEpubDeleted = await deleteObject(desertRefEpub)
        .then(() => {
          console.log("deleted Epub");
          return true;
        })
        .catch((error) => {
          console.error(
            "Firebase error: Uh-oh, an error occurred when deleting objects..." +
              error
          );
          return false;
        });
      if (isImgDeleted && isEpubDeleted) return true;
      return false;
    } catch (e) {
      console.error("Uh-oh, an error occurred when deleting objects...");
      return false;
    }
  };

  return { setDocument, getDocuments, deleteDocument, deleteFiles };
};

export default useFirestore;
