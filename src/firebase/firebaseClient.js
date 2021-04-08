import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const CLIENT_CONFIG = {
  apiKey: "AIzaSyDOfarCZU7RnOnPtZ8WbO0t7_rtxy5enhE",
  authDomain: "budget-tracker-cefc9.firebaseapp.com",
  projectId: "budget-tracker-cefc9",
  storageBucket: "budget-tracker-cefc9.appspot.com",
  messagingSenderId: "57539245816",
  appId: "1:57539245816:web:a21a1d81778441777ded0d",
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

export { firebaseClient };
