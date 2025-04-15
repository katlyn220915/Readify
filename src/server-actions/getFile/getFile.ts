import { getDownloadURL, getStorage, ref } from "firebase/storage";

import app from "@/lib/firebase/initialize";

// Create a reference with an initial file path and name
const storage = getStorage(app);

const getFileURL = async (path: string) => {
  const theFilePath = path;
  const fileRef = ref(storage, theFilePath);
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
