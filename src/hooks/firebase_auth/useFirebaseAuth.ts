import app from "../../lib/firebase/initialize";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const useFirebaseAuth = () => {
  const auth = getAuth(app);

  const userSignUp = async (email: string, password: string) => {
    try {
      const userUid = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.info("Firebase/Auth: User Signed up");
          return user.uid;
        })
        .catch((error) => {
          console.error(error.code);
        });
      return userUid;
    } catch (e) {
      console.error(e);
    }
  };

  const userSignin = async (email: string, password: string) => {
    let errorMessage = "unKnown Error";
    try {
      const isUserLogin = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          return true;
        })
        .catch((error) => {
          errorMessage = error.code;
          return false;
        });
      if (!isUserLogin) return errorMessage;
      return isUserLogin;
    } catch (e) {
      console.error(e);
    }
  };

  const userSignout = async () => {
    try {
      signOut(auth)
        .then(() => {
          console.info("Firebase/Auth: user signed out");
        })
        .catch((e) => {
          console.error(e.code);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      return user;
    } catch (e) {
      console.error(e);
    }
  };

  const userUpdateFirstName = async (firstName: string) => {
    let errorMessage = "UnKnown Error";
    try {
      const user = auth.currentUser;
      if (user === null) {
        errorMessage = "User hasn't login.";
        return errorMessage;
      }
      updateProfile(user, {
        displayName: firstName,
      })
        .then(() => {
          console.info("Firebase: User firstName updated !");
        })
        .catch((e) => {
          console.error(e.code);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    userSignUp,
    userSignin,
    userSignout,
    userUpdateFirstName,
    getCurrentUser,
  };
};

export default useFirebaseAuth;
