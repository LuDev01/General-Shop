import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContent } from "./CartContent";
import { DataContext } from "./context/DataContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CartContent.css";
import "./CartModal.css";

function CartModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cart } = useContext(DataContext);

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,0);

  return (
    <>
      <div style={{ position: "relative" }} onClick={handleShow}>
        <FaShoppingCart className="cart-icon" />
        {totalQuantity > 0 && <span className='cart-counter'>{totalQuantity}</span>}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className="cart-modal-container"
        dialogClassName="cart-modal-dialog"
      >
        <Modal.Header
          closeButton
          className="cart-modal-header"
          style={{ color: "white" }}
        >
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body className="cart-modal-body">
          <CartContent />
        </Modal.Body>

        <Modal.Footer
          className="cart-modal-footer"
          style={{ backgroundColor: "#F4F2F2" }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Keep buying
          </Button>
          <Link to="/cart">
            <Button style={{ backgroundColor: "black" }}>
              Complete purchase
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;
