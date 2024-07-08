import './App.css';
import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      <NoteForm addNote={addNote} updateNote={updateNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
};

export default App;
