import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firestore = getFirestore();

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userRef = doc(firestore, "users", user.uid); // Reference to the user document

  //Create user in collection "users"
  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email,
      displayName: null,
      photoURL: null,
      createdAt: new Date(),
    },
    { merge: true }
  ); // Use merge to update the document if it already exists
  console.log(`Creating user: ${JSON.stringify(userRef)}`);
  return user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  //Get user info
  const userRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  console.log(
    `UserData: ${JSON.stringify(userData)}, user: ${JSON.stringify(user)}`
  );
  return user;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // Get user information
  const user = result.user;

  // Create a user object to store in Firestore
  const userRef = doc(firestore, "users", user.uid); // Reference to the user document

  // Set user data in Firestore
  await setDoc(
    userRef,
    {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(), // Optional: Track when the user was created
    },
    { merge: true }
  ); // Use merge to update the document if it already exists
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
