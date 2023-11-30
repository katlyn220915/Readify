import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "@/lib/firebase/initialize";

const storage = getStorage(app);

const storeFiles = () => {
  const storeEpub = async (uuid: string, id: number, file: any) => {
    try {
      const spaceRef = ref(storage, `/${uuid}/books/${id}/${id}.epub`);
      uploadBytes(spaceRef, file).then((snapshot) => {
        console.info("Upload a file !");
        console.log(snapshot);
      });
    } catch (e) {
      console.error("Firebase/storage: upload file error:", e);
    }
  };

  return { storeEpub };
};

export default storeFiles;
