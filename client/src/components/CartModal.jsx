import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import CartContent from './CartContent';

function CartModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaShoppingCart className='cart-icon' onClick={handleShow}>
        Launch demo modal
      </FaShoppingCart>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CartContent/>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
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