import { useState, useEffect } from 'react';
import './modal.css';
import React from 'react';



function Modal({isOpen, closeModal}) {
const handleModalDialogClick = (e) => {
    e.stopPropagation();
    
}
  return (

    <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}> 
      <section className="modal_dialog" onClick={handleModalDialogClick}>
      hola modal
      <button onClick={closeModal}>close</button>
      </section>
    </div>
  );
}

export default Modal;
