import { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartContent } from './CartContent';
import "./CartModal.css";

function CartModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaShoppingCart className='cart-icon' onClick={handleShow}>
      </FaShoppingCart>

      <Modal show={show} onHide={handleClose} className='cart-modal-container' dialogClassName='cart-modal-dialog'>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body className='cart-modal-body'>
          <CartContent/>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Keep buying
          </Button>
          <Link to= '/cart'>
            <Button variant="primary" >
              Complete purchase
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;