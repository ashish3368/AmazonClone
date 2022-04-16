import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBC3696R4WQzR-CuuQlxyxk8rT2Jwn8_NM",
    authDomain: "amzncl0ne.firebaseapp.com",
    projectId: "amzncl0ne",
    storageBucket: "amzncl0ne.appspot.com",
    messagingSenderId: "122821681554",
    appId: "1:122821681554:web:6b927b014bfdb8bc8f214b",
    measurementId: "G-04KWCNVCFV"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);