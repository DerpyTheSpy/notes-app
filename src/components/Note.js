import React, { useState } from 'react';
import './Note.css';

const Note = ({ note, deleteNote, editNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="note-container">
      <div className="note">
        <h2>{note.title}</h2>
        <button onClick={() => editNote(note)}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
        <button onClick={handleQuickView}>Quick View</button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
