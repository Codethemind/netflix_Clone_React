import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCJEgB8x-Pfrf2HQTD9LsA-h1Nsnds8sPM",
  authDomain: "netflixclone-6704a.firebaseapp.com",
  projectId: "netflixclone-6704a",
  storageBucket: "netflixclone-6704a.firebasestorage.app",
  messagingSenderId: "3946216753",
  appId: "1:3946216753:web:3f20f1ed0701939ba98410",
  measurementId: "G-K3HC16D823"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const db =getFirestore()


const signup=async (name,email,password)=>{
    try{
        const res =await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login= async(email,password)=>{
 try {
    await signInWithEmailAndPassword(auth,email,password)
 } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
}
}


const logout =()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}