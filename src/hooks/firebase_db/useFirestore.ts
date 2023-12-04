import app from "../../lib/firebase/initialize";
import { Firestore, getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";

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
  return { setDocument, getDocuments };
};

export default useFirestore;
