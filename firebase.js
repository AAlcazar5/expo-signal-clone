import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FIREBASE_API_KEY } from "@env";
import { FIREBASE_AUTH_DOMAIN } from "@env";
import { FIREBASE_PROJECT_ID } from "@env";
import { FIREBASE_STORAGE_BUCKET } from "@env";
import { FIREBASE_MESSAGING_SENDER_ID } from "@env";
import { FIREBASE_APP_ID } from "@env";

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: `${FIREBASE_AUTH_DOMAIN}`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${FIREBASE_APP_ID}`,
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
