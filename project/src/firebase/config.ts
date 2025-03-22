import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBPua2dc3ON-JsKrnaf0jLonDvAb7xg0o",
  authDomain: "medicalapp-8f065.firebaseapp.com",
  projectId: "medicalapp-8f065",
  storageBucket: "medicalapp-8f065.firebasestorage.app",
  messagingSenderId: "599251902516",
  appId: "1:599251902516:web:7ca3cb08734ddd7c656a61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;