import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTrzs8_L-G0s34tSjnMUtrUPG8m7q-YB8",
  authDomain: "fir-9-dojo-65c85.firebaseapp.com",
  projectId: "fir-9-dojo-65c85",
  storageBucket: "fir-9-dojo-65c85.appspot.com",
  messagingSenderId: "261245759225",
  appId: "1:261245759225:web:a36b824bf61013fe73fc28",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
