import app from "../../lib/firebase/initialize";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const useFirebaseAuth = () => {
  const auth = getAuth(app);
  const userSignUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return { userSignUp };
};

export default useFirebaseAuth;
