// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCUpXnxE-nZGan12LrjhkyF0gskP1SkFiA',
	authDomain: 'tinder-clone-9e1e5.firebaseapp.com',
	projectId: 'tinder-clone-9e1e5',
	storageBucket: 'tinder-clone-9e1e5.appspot.com',
	messagingSenderId: '510219033145',
	appId: '1:510219033145:web:68810c0a794c84682ecbe8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
