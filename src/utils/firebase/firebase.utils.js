import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider,
createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOfAqy1i8OC7BTp17my5Kfd_EefnzqcOo",
  authDomain: "capstone-shop-1bebe.firebaseapp.com",
  projectId: "capstone-shop-1bebe",
  storageBucket: "capstone-shop-1bebe.appspot.com",
  messagingSenderId: "260894373838",
  appId: "1:260894373838:web:b726b329c1828668849d9f"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.getCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//Инициализируем базу данных
export const db = getFirestore();

//Берет данные с аутентификации и заносит в бд
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  //принимает 3 параметра - 1)база данных куда записывать 2)название коллекции 3)уникальный идентификатор каждого элемента коллекции (при логине firebase каждому присылает уникальный id)
  const  userDocRef = doc(db, 'users', userAuth.uid);
  const userSnaphot = await getDoc(userDocRef)

   //if user data not exist - create /set the document
  if(!userSnaphot.exists()){
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      })
    } catch (error) {
        console.log("error creating the user", error.message);
    }
  }

  return userDocRef

  //if user data exist - do nothing
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async() => await signOut(auth);

//запускает колбек каждый раз когда менятеся состояние auth
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)


//===============наполнение firebase инфой==================//

export const addCollectionAndDocuments  = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit()
  console.log('done');
}

//===========================получение с firebase инфы========================//

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}