import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helpers to share auth state with dashboard via localStorage
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('rps_user', JSON.stringify({ uid:user.uid, email:user.email, name:user.displayName || '' }));
  } else {
    localStorage.removeItem('rps_user');
  }
});

// Register
export async function register(name, email, password){
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  return cred.user;
}

// Login
export async function login(email, password){
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// Logout
export async function logout(){
  await signOut(auth);
}
