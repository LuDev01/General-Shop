import { NavBar } from './NavBar';
import {products} from "./Products";
import "./Products.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";

export const MenProducts = () => {
  return (
    <>
<NavBar/>
  <h1 style={{margin:"7rem",textAlign:"center"}}>Men Products Section </h1>

  <Row xs={1} md={3} className="g-4 m-4 ">
        {products.filter((el)=>el.category==="Man").map((el,idx)=>(
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
  )
  
}
