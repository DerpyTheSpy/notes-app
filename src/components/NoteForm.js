import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ addNote, updateNote, currentNote, setCurrentNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      alert('Both title and content are required.');
      return;
    }

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

  const handleDiscardChanges = () => {
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form-container">
      <h2 className="note-form-title">{currentNote ? 'Edit Note' : 'Add Note'}</h2>
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
        <div className="note-form-buttons">
          <button type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
          {currentNote && (
            <button type="button" onClick={handleDiscardChanges}>
              Discard Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
