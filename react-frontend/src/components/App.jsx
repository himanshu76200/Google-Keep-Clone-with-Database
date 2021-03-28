import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const axios = require("axios").default;

function App() {

  var notesFromDB = [];

  axios.get('http://localhost:3001/')
  .then(function (response) {
    notesFromDB = response.data;
    // console.log(response.data.title);
  })
  .catch(function (error) {
    console.log(error);
  })

  // eslint-disable-next-line no-undef
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {

    setNotes([...notesFromDB, newNote]);

    console.log(newNote);

    axios.post('http://localhost:3001/', newNote)
      .then(() => console.log('Note Created'))
      .catch(err => {
        console.error(err);
      });
  };

  function deleteNote(id, mainID) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    const url = "http://localhost:3001/" + mainID;

    axios.delete(url)
    .then(() => {
      console.log("deleted data");
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            mainID={noteItem._id}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
