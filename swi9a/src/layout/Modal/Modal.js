import React from 'react';
import "./Modal.css"

export const Modal = ({showModal, children, hideModal}) => {
    return (
        showModal &&(
        <div className="modal" onClick={hideModal}>
           <div className="modal-main">   
            {children}
            </div>     
        </div>
        )
    )
}
