import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ addNote, updateNote, currentNote, setCurrentNote }) => {
  const [note, setNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentNote) {
      setNote({
        title: currentNote.title,
        content: currentNote.content
      });
    } else {
      setNote({ title: '', content: '' });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      setError('Both title and content are required.');
      return;
    }
    setError('');
    if (currentNote) {
      updateNote({ ...note, id: currentNote.id });
      setCurrentNote(null);
    } else {
      addNote({ ...note, id: Date.now() });
    }
    setNote({ title: '', content: '' });
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <h2 className="note-form-title">Title</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Add Note"
          value={note.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
      </form>
    </div>
  );
};

export default NoteForm;
