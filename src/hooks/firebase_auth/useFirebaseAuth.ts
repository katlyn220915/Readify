import app from "../../lib/firebase/initialize";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const useFirebaseAuth = () => {
  const auth = getAuth(app);

  const userSignUp = async (email: string, password: string) => {
    const userUid = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.info("Firebase/Auth: User Signed up");
        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
      });
    return userUid;
  };

  const userSignin = async (email: string, password: string) => {
    let errorMessage = "unKnown Error";
    const isUserLogin = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage = error.code;
        return false;
      });
    if (!isUserLogin) return errorMessage;
    return isUserLogin;
  };

  return { userSignUp, userSignin };
};

export default useFirebaseAuth;
