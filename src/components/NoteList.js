import React from 'react';
import Note from './Note';
import './NoteList.css';


const NoteList = ({ notes, deleteNote, editNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
      ))}
    </div>
  );
};

export default NoteList;
