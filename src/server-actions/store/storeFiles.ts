import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import app from "@/lib/firebase/initialize";

const storage = getStorage(app);

const storeFiles = () => {
  const storeEpub = async (file: any, path: string) => {
    try {
      const spaceRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(spaceRef, file);

      const getDownloadURLPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // console.log("User has no right to access to the object");
                reject(error.code);
                break;
              case "storage/canceled":
                // console.log("User has cancel the upload");
                reject(error.code);
                break;
            }
          },
          () => {
            try {
              const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
              // console.log("Got the url !" + downloadURL);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });

      const downloadURL = await getDownloadURLPromise
        .then((downloadURL) => {
          return downloadURL;
        })
        .catch((error) => {
          console.error("Error getting download URL: " + error);
        });
      return downloadURL;
    } catch (e) {
      console.error("Firebase/storage: upload file error:", e);
    }
  };

  return { storeEpub };
};

export default storeFiles;
