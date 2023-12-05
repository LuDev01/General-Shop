import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import { useNavigate } from 'react-router-dom';
import { ProductDetails } from "./ProductDetails";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// import Notification from './Notification';

export const ProductsCart = (productId) => {
    const { data, cart, setCart } = useContext(dataContext);

    const navigate = useNavigate();

     const buyProducts = (product) => {
         console.log(product)
         setCart([...cart, product])
     };

    return (
        <>
            <Row xs={1} md={3} className="g-4 m-4">
                {data.map((product, idx) => (
                    <Col key={idx}>
                        <Card className="product-cards" key={product.id}>
                            <Card.Img className="products-img" variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Description: {product.description}</Card.Text>
                                <Card.Text>Price: {product.price}</Card.Text>
                                {/* <Notification productId={product.id} /> */}
                                {/* <button onClick={() => buyProducts(product)}>Buy</button> */}
                                <div className=" d-grid ">
                                    <button type="submit" size="lg" className="submit-button btn btn-outline-info mb-3"  onClick={() => buyProducts(product)}>Add to cart</button>
                                    <button type="submit" size="lg" className="submit-button btn btn-outline-warning" onClick={() =>navigate(`/productDetails/${productId}`) }>Product details</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        
        </>
    );
};

// export default ProductsCart;