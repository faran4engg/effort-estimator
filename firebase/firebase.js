// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'effort-estimator.firebaseapp.com',
  projectId: 'effort-estimator',
  storageBucket: 'effort-estimator.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

if (typeof window !== 'undefined') {
  // Enable analytics. https://firebase.google.com/docs/analytics/get-started
  if ('measurementId' in firebaseConfig) {
    getAnalytics();
  }
}

export { app, db };
