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

  const limitToThreeParagraphs = (content) => {
    const paragraphs = content.split('\n');
    return paragraphs.slice(0, 3).map((paragraph, index) => (
      <p key={index} className="note-paragraph">{paragraph}</p>
    ));
  };

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="note-paragraph">{paragraph}</p>
    ));
  };

  const contentPreview = note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content;

  return (
    <div className="note-container">
      <div className="note">
        <h2>{note.title}</h2>
        <div className="content-preview">{limitToThreeParagraphs(contentPreview)}</div>
        <button onClick={() => editNote(note)}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
        <button onClick={handleQuickView}>Quick View</button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
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
