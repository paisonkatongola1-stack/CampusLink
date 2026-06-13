import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCL_4vsmSSWfRpNO-LqhQKaqA-ljICYY1c",
  authDomain: "campuslink-779dd.firebaseapp.com",
  projectId: "campuslink-779dd",
  storageBucket: "campuslink-779dd.firebasestorage.app",
  messagingSenderId: "723076865853",
  appId: "1:723076865853:web:c419f0f676b33ece292f54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);