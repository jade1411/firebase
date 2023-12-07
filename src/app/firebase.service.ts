import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAgB4Ax_UNmfwNObtvvJRcUB-XqT_YEgro",
  authDomain: "fir-app-f994c.firebaseapp.com",
  projectId: "fir-app-f994c",
  storageBucket: "fir-app-f994c.appspot.com",
  messagingSenderId: "129540400566",
  appId: "1:129540400566:web:8f15f764d74af477cd8d17",
  measurementId: "G-ZRBPV42HWQ"
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  auth = getAuth();
  checkEmailVerificationCode: any;

  constructor() {
    // The onAuthStateChanged will be triggered when the user login, logout
    // and when the user register also.
    // That's how the user is saved/removed in localStorage 
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

 
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
    });
  }
}