import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';



function Notification({productId}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
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
          <Toast.Body>Product added to you shopping cart! =)</Toast.Body>
        </Toast>
      
      </Col>
        <div className=" d-grid ">
      <button type="submit" size="lg" class="submit-button btn btn-outline-info mb-3" onClick={() => setShow(true)}>Add to cart</button>
      <button type="submit" size="lg" class="submit-button btn btn-outline-warning" onClick={() =>navigate(`/productDetails/${productId}`) }>Product details</button>
      {/* <Link to={`/productDetails/${productId}`} onClick={()=>setRedirect(!redirect)}>
      <button type="submit" size="lg" class="submit-button btn btn-outline-warning">Product details</button>  
      </Link> */}
      </div>
    </Row>
    </div>
  );
}

export default Notification;