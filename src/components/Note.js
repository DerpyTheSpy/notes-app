import React, { useState, useEffect } from 'react';
import './Note.css';

const Note = ({ note, deleteNote, editNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuickView = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsAnimating(true);
    }, 0); // Allow state to update and then trigger animation
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300); // Match this duration with the CSS animation duration
  };

  const limitToOneParagraph = (content) => {
    const paragraphs = content.split('\n');
    return paragraphs.slice(0, 1).map((paragraph, index) => (
      <p key={index} className="note-paragraph">{paragraph}</p>
    ));
  };

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="note-paragraph">{paragraph}</p>
    ));
  };

  const contentPreview = limitToOneParagraph(note.content);

  return (
    <div className={`note-container ${isModalOpen ? 'highlight' : ''}`}>
      <div className="note">
        <h2>{note.title}</h2>
        <div className="content-preview">{contentPreview}</div>
        <button onClick={() => editNote(note)}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
        <button onClick={handleQuickView}>Quick View</button>
      </div>
      {isModalOpen && (
        <div className={`modal-overlay ${isAnimating ? 'fade-in' : 'fade-out'}`}>
          <div className={`modal ${isAnimating ? 'grow' : 'shrink'}`}>
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>{note.title}</h2>
            <div className="modal-content">{renderContent(note.content)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
