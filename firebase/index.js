import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID || "",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

async function getDocument(collectionName, key) {
  const docRef = doc(db, collectionName, key);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data();
}
async function getDocuments(collectionName) {
  const ref = collection(db, collectionName);
  const response = await getDocs(ref);
  const res = response.docs.map((doc) => doc.data());
  return res;
}
async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}

async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const existingData = docSnapshot.data();
    const updatedData = { ...existingData };
    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });
    await updateDoc(docRef, updatedData);
  } else {
    const initialData = {};
    keys.forEach((key, index) => {
      initialData[key] = values[index];
    });

    await setDoc(docRef, initialData);
  }
}

async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, "blog", "blog"), { posts: [post] });
  } else {
    await updateDoc(doc(db, "blog", "blog"), {
      posts: arrayUnion(post),
    });
  }
}
async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

export {
  addDocument,
  updateDocument,
  getDocument,
  addBlogPost,
  updateBlogPost,
  getBlogPosts,
  getDocuments,
  auth,
  db,
  storage,
};
