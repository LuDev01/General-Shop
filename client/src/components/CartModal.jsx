import { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import { CartContent } from './CartContent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CartContent.css';
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
        <Modal.Header closeButton className='cart-modal-header' style={{ color: 'white' }}>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body className='cart-modal-body'>
          <CartContent/>
        </Modal.Body>
        
        <Modal.Footer className='cart-modal-footer' style={{backgroundColor:'#F4F2F2'}} >
          <Button variant="secondary" onClick={handleClose} >
            Keep buying
          </Button>
          <Link to= '/cart'>
            <Button style={{backgroundColor:'black'}}>
              Complete purchase
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;