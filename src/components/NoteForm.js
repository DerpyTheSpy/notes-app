import './NoteForm.css';
import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, updateNote, currentNote, setCurrentNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      updateNote({
        ...currentNote,
        title,
        content,
      });
      setCurrentNote(null);
    } else {
      addNote({
        id: Date.now(),
        title,
        content,
      });
    }
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form-container">
      <div className="note-form-title">Add Note</div>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
      </form>
    </div>
  );
};

export default NoteForm;
