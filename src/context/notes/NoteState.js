import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  
  const host = "http://localhost:5000";
  const noteIntial = []
  const [notes, setNotes] = useState(noteIntial);
  // get all a Note
  const getNote = async () => {
    // TODO :API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    })  ;
    const json=await response.json();
    setNotes(json);
  };
  
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO :API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note= await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify(),
    });
    const json= response.json();
    
    const newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };

  // Edit a Note
  const editNote =async (id, title, description, tag) => {
    
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json= await response.json({title,description,tag});
      console.log(json)

      let newNotes=JSON.parse(JSON.stringify(notes))
    // eslint-disable-next-line no-unreachable
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  return (
    // 'use strict';
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
