import app from "../../lib/firebase/initialize";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const useFirebaseAuth = () => {
  const auth = getAuth(app);
  const userSignUp = async (email: string, password: string) => {
    const userUid = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
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

  return { userSignUp };
};

export default useFirebaseAuth;
