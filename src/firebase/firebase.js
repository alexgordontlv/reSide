
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config  = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:  process.env.REACT_APP_DATABASE_URL,
    projectId:  process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID
  };
console.log(config)
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
    .doc(userAuth.uid || userAuth.id)
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
    .doc(userAuth.uid || userAuth.id)
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
  