import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import {products} from "./Products";



export const AllProducts = () => {
    return (
      <>
      <Row xs={1} md={3} className="g-4 m-4 ">
        {products.map((el, idx) => (
          <Col key={idx}>
            <Card className="product-cards">
              <Card.Img className="products-img" variant="top" src={el.image} />  
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.description}</Card.Text>
                <Card.Text>Price: {el.price}</Card.Text>
                 <Notification productId={el.id}/>
              </Card.Body>
              
             
            </Card>
          </Col>
        ))}
      </Row>
      </>
    );
  };
  