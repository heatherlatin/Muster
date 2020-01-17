/* eslint-disable react/prefer-stateless-function */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SavedEventModal.css";

// get user saved events from database

function SavedEventModal() {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="link" onClick={handleShow}>
          EVENT TITLE HERE!
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Event Information!</Modal.Title>
          </Modal.Header>
          <Modal.Body>This is your event information!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  


                           
                
           


export default SavedEventModal;
