import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const PurchaseModal = ({ isOpen, onRequestClose }) => {
  return (
    //Si el botón de send order se aplica y no hay información, no pasa nada. Los campos son obligatorioa
    //Limpiar el carrito al finalizar la compra
    //Agregar input del nombre del usuario
    //Al finalizar la compra un modal que le diga: Compra realizada con exito

    //Adecuar botón de addToCart de productos sugeridos
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shipment information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h2>Enter Your Address</h2>
        <form>
          <label >Address: </label>
          <input
            type="text"
            id="addressInput"
            placeholder="Enter your address"
          />
        </form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Send order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// export default PurchaseModal;



