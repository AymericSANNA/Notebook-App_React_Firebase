// == React Import
import React,  { useState, useEffect } from "react";
// == Firebase Import
import firebase from "firebase/compat/app";
import "firebase/compat/database";
// == Components Import
import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import Notebook from "./components/Notebook";
import "./App.css";

const firebaseConfig = {
	apiKey: "AIzaSyCeL6y_pRaq8YXbNs2IuLOWmLVQg45hI8I",
	authDomain: "evernote-clone-7db1f.firebaseapp.com",
	projectId: "evernote-clone-7db1f",
	storageBucket: "evernote-clone-7db1f.appspot.com",
	messagingSenderId: "692880825727",
	appId: "1:692880825727:web:6299cd3cc283fbce7d0e4a",
	measurementId: "G-4069060CD8",
  databaseURL: "https://evernote-clone-7db1f-default-rtdb.europe-west1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [noteBookData, setNoteBookData] = useState([]);

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
  );
};

export default App;