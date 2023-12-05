import { useContext } from "react";
import { dataContext } from "./context/DataContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Notification from './Notification';

const ProductsCart = () => {
    const { data, cart, setCart } = useContext(dataContext);

    const buyProducts = (product) => {
        console.log(product)
        setCart([...cart, product])
    };

    return (
        <Row xs={1} md={3} className="g-4 m-4">
            {data.map((product, idx) => (
                <Col key={idx}>
                    <Card className="product-cards" key={product.id}>
                        <Card.Img className="products-img" variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Description: {product.description}</Card.Text>
                            <Card.Text>Price: {product.price}</Card.Text>
                            <Notification productId={product.id}/>
                            <button onClick={() => buyProducts(product)}>Buy</button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductsCart;