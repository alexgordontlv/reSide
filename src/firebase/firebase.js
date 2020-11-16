
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config  = {
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
    firebase.initializeApp(config);
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
  export const getCustomersFromFireStore = async (userAuth) =>{
    if (!userAuth) return;
    const collectionRef = await firestore
    .collection('users')
    .doc(userAuth.uid)
    .collection('customers')
    .get()
    return collectionRef;
  }
  export const addCustomerToFireStore = async (userAuth,customer) => {
    if (!userAuth) return;
    const customerRef = await firestore
    .collection('users')
    .doc(userAuth.uid)
    .collection('customers')
    .add(customer)
    await customerRef.update({
      id: customerRef.id
    })

    return customerRef
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  