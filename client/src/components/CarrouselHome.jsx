import Carousel from 'react-bootstrap/Carousel';
import bg5 from "./assets/Background5.jpg";
import bg6 from "./assets/Background6.jpg";
import bg7 from "./assets/Background7.jpg";

function DarkVariantExample() {

  const carouselItemStyle = {
      transition: 'opacity 0.2s'
    };

  return (
    <Carousel data-bs-theme="dark" className='custom-carrousel'>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg7}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={{color:'white'}}>Check our latest promotions</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg5}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg6}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
