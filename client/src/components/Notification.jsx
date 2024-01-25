import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { useContext } from "react";
import { dataContext } from "./context/DataContext";

function Notification({productId, buyProducts, product}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { data, cart, setCart } = useContext(dataContext);
  
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
      </Row>
    </div>
  );
}

export default Notification;