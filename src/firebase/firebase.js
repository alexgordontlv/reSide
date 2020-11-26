
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
require('dotenv').config()
/*
const config  = {
    apiKey: process.env.apiKey,
    authDomain:  process.env.authDomain,
    databaseURL:  process.env.databaseURL,
    projectId:  process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };*/

  const firebaseConfig = {
    apiKey: "AIzaSyDtPXXZHxEkqqqUL98v6XOifgNMswpanNM",
    authDomain: "reside-6b523.firebaseapp.com",
    databaseURL: "https://reside-6b523.firebaseio.com",
    projectId: "reside-6b523",
    storageBucket: "reside-6b523.appspot.com",
    messagingSenderId: "115084379256",
    appId: "1:115084379256:web:9951c9ac26d1635624d98d",
    measurementId: "G-5SN1T1LMLD"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const createUserProfileDocument = async(userAuth,additionalData)=> {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
 
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createDate = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createDate,
          ...additionalData
        })

      }catch(err){
        console.log('error for user', err.message)
      }


    }
    return userRef;
  }
  export const getDataFromFireStore = async (userAuth,collection) =>{
    if (!userAuth) return;
    const collectionRef = await firestore
    .collection('users')
    .doc(userAuth.uid)
    .collection(collection)
    .get()
    return collectionRef;
  }
  export const addDataToFireStore = async (userAuth,data,target) => {
    if (!userAuth) return;
    const customerRef = await firestore
    .collection('users')
    .doc(userAuth.uid)
    .collection(target)
    .add(data)
    await customerRef.update({
      id: customerRef.id
    })

    return customerRef
  }
  export const deleteDataFromFireBase = async (userAuth,data,target) => {
    if (!userAuth) return;
    firestore
    .collection('users')
    .doc(userAuth.uid)
    .collection(target)
    .doc(data)
    .delete()
    .then(()=>{
      console.log("Document successfully deleted!");
    })
  }




  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  