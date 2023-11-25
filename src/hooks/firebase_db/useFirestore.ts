import app from "../../lib/firebase/initialize";
import { Firestore, getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

const useFirestore = () => {
  const setDocument = async (
    collectionName: string,
    documentName: string,
    data: object
  ) => {
    try {
      await setDoc(doc(db, collectionName, documentName), data);
      console.info("Firestore: Already Set Document ");
    } catch (e) {
      throw new Error("Firestore Set Data Error");
    }
  };
  return { setDocument };
};

export default useFirestore;
