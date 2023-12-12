import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
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
  private readonly app: FirebaseApp = initializeApp(firebaseConfig);
  private readonly auth: Auth = getAuth(this.app);
  checkEmailVerificationCode: any;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);

    }
  }
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
    localStorage.removeItem('user');
    });
    }
  }
