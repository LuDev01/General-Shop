import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import img1 from "./assets/products/img1.png";
import img2 from "./assets/products/img2.png";
import img3 from "./assets/products/img3.png";
import "./Products.css";

export const products = [
  {
    id:1,
    name: "Red t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img1,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id:2,
    name: "White t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img2,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id:3,
    name: "Black t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img3,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id:4,
    name: "Red t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img1,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id:5,
    name: "White t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img2,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id:6,
    name: "Black t-shirt",
    description:
      "This is a longer card with supporting text below as a natural to additional content. This content is a little bitlonger.",
    price: "$25",
    image: img3,
    size: ['XS', 'S', 'M', 'L', 'XL'],
  },
];

export const Products = () => {
  const imgArray = [img1, img2, img3];
  
  return (
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
  );
};
