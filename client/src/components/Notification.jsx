import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { useContext } from "react";
import { dataContext } from "./context/DataContext";
// import ProductsCart from './ProductsCart';

function Notification({productId, buyProducts, product}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { data, cart, setCart } = useContext(dataContext);
  

  //  const buyProducts = (product) => {
  //      console.log(product)
  //      setCart([...cart, product])
  //  };

  const addToCart = (product) => {
    setShow(true);
    console.log(product)
    setCart([...cart, product])
    buyProducts(product)
  }
  
  return (
    <div className=''>
    <Row>
      <Col xs={10}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide   position='buttom-end' className='mt-3'  style={{backgroundColor:'#f3ad79',position: 'fixed', right: '20px', top: '20px', marginRight: '20px'}} >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""/>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>Product added to your shopping cart!</Toast.Body>
        </Toast>
      
      </Col>
        <div className=" d-grid ">
          <button type="submit" size="lg" className="submit-button btn btn-outline-info mb-3" onClick={addToCart}>Add to cart</button>
          <button type="submit" size="lg" className="submit-button btn btn-outline-warning" onClick={() =>navigate(`/productDetails/${productId}`) }>Product equis de</button>
        </div>
    </Row>
    </div>
  );
}

export default Notification;