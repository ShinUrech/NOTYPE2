import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword,updateProfile} from "@firebase/auth";
import {getFirestore, doc, setDoc, getDoc, updateDoc} from '@firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiyZ74eadub3IjmWGg7_fen_2Rsxhwuls",
  authDomain: "notype-project.firebaseapp.com",
  projectId: "notype-project",
  storageBucket: "notype-project.appspot.com",
  messagingSenderId: "566443304694",
  appId: "1:566443304694:web:76e20c7e753a8e5fd02ed7",
  measurementId: "G-XGNJ11N8HJ"
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://notype-project.firebaseapp.com/__/auth/action',
  // This must be true.
  handleCodeInApp: true,
};

// Initialize Firebase and admin sdk
const app = initializeApp(firebaseConfig);

//Initialize services
export const auth = getAuth(app);
export const database = getFirestore(app);

//Collection reference
export const emailConfirmation = async () => {
  try{
    await sendEmailVerification(auth.currentUser, actionCodeSettings)
  } catch(e){
    console.log(e)
  }
}

export const createUserData = async  (name, surname, birthdate, country, phoneNumber) => {
  try{
    await setDoc(doc(database,'Users', auth.currentUser.uid),{
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      birthdate: birthdate,
      country: country,
      isStaff: false,
      isAdmin: false,
      cart: 0,
      total: 0,
    })
  } catch(e){
    console.log(e)
  }
}

export  const signInHandler = async (email, password, name, surname,  birthdate, country, phoneNumber) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      sendEmailVerification
      await createUserData(name, surname, birthdate, country, phoneNumber)
      
      updateProfile(auth.currentUser, {
        displayName: name+" "+surname
      })
    } catch(e) {
      console.log(e)
    }
  }


export const handlePasswordChange = async () => {
  sendPasswordResetEmail(auth, auth.currentUser.email);
}

export const getUserData = async () => {
  const userJSON = await getDoc(doc(database, 'Users', auth.currentUser.uid))
  userJSON.data()
  

}

export const changePhoneNumber = async (number) => {
  const ref = doc(database, 'Users', auth.currentUser.uid)
  updateDoc(ref, { phoneNumber: number})
}


