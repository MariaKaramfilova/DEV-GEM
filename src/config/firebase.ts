import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIuJOdAUEKhvZx3oLHD0OrvTj4Qi5gNh4",
  authDomain: "unknown-adonis.firebaseapp.com",
  projectId: "unknown-adonis",
  storageBucket: "unknown-adonis.appspot.com",
  messagingSenderId: "80084686046",
  appId: "1:80084686046:web:9502263e2b70af4a1a1e4f",
  databaseURL: '//unknown-adonis-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage();
export default app;

