import app from "../../lib/firebase/initialize";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);

const useCloudStorage = () => {
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

  const getEpubDownloadURL = async (path: string) => {
    const url = getDownloadURL(ref(storage, path)).then((url) => {
      return url;
    });
  };

  return { deleteFiles };
};

export default useCloudStorage;
