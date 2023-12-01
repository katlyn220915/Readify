import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "@/lib/firebase/initialize";

// Create a reference with an initial file path and name
const storage = getStorage(app);

const getFileURL = async (path: string) => {
  const fileRef = ref(storage, `${path}`);
  try {
    const url = getDownloadURL(fileRef).then((url) => {
      return url;
    });
    return url;
  } catch (e) {
    console.error("Get file error:", e);
  }
};

export default getFileURL;
