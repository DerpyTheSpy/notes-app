import React, { useState, useEffect, useRef } from 'react';
import './Note.css';

const Note = ({ note, deleteNote, editNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

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
    const firstParagraph = paragraphs[0];

    return firstParagraph.length > 100
      ? firstParagraph.substring(0, 100) + '...'
      : firstParagraph;
  };

  const renderContent = (content) => {
    const paragraphs = content.split('\n').map((paragraph, index) => (
      <p key={index} className="note-paragraph">
        {paragraph}
      </p>
    ));
    return paragraphs;
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
          <div ref={modalRef} className={`modal ${isAnimating ? 'grow' : 'shrink'}`}>
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
