// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { isEmpty } from 'utils/util';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// DataBase : Post
const COLLECTION_NAME = 'nweets';
const USER_COLLECTION_NAME = 'users';

export const POST_COLLECTION = collection(db, COLLECTION_NAME);

export const POST_DOC = (id) => {
  return doc(db, COLLECTION_NAME, id);
};
export const USER_DOC = (uid) => doc(db, USER_COLLECTION_NAME, uid);

export const set_user_doc = async (user) => {
  const { uid, displayName, photoURL, email } = user;
  try {
    await setDoc(USER_DOC(uid), {
      displayName,
      photoURL,
      email,
    });
  } catch (error) {
    console.log(error);
  }
};
export const get_user_by_uid = async (uid) => {
  const getUserByUid = await getDoc(USER_DOC(uid));
  // null : undefined
  return getUserByUid.data();
};

export { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword };
