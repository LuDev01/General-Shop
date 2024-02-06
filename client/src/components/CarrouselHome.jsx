import Carousel from 'react-bootstrap/Carousel';
import bg1 from "./assets/Background1.jpg";
import bg2 from "./assets/Background2.jpg";
import bg3 from "./assets/Background3.jpg";
import bg4 from "./assets/Background4.jpg";
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
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg5}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg6}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>

      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
