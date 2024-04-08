// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc4nJ-Ju3swnhWZ7rXEnh0XOmG6Llbktc",
  authDomain: "talleresnucleo3.firebaseapp.com",
  projectId: "talleresnucleo3",
  storageBucket: "talleresnucleo3.appspot.com",
  messagingSenderId: "386788033002",
  appId: "1:386788033002:web:b25080028ba3a82bca3293",
  measurementId: "G-KNMMBQRM06",
  databaseURL:"https://talleresnucleo3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  export const dbRealTime=getDatabase(app)
