import { useState, useEffect } from 'react';
import './modal.css';
import React from 'react';



function Modal({isOpen, closeModal, contenido}) { //preguntar porque esta en llaves
 const handleModalDialogClick = (e) => {
    e.stopPropagation();
    
}
  return (

    // <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}> 
    // {console.log('ejemplo',` modal ${isOpen && 'modal-open'}`)}
    //   <section className="modal_dialog" onClick={handleModalDialogClick}>
    //   hola modal
    //   <button onClick={closeModal}>close</button>
    //   </section>
    // </div>
     <div className={isOpen?'modal modal-open':'modal'} onClick={closeModal}> 
      <section className="modal_dialog" onClick={handleModalDialogClick}>
      hola modal
      <button onClick={closeModal}>close</button>
      <article>{contenido}</article>
      </section>
    </div>

  );
}

export default Modal;
