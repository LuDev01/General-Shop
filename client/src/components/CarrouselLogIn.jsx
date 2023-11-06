import Carousel from 'react-bootstrap/Carousel';
import bg1 from "./assets/Background1.jpg";
import bg2 from "./assets/Background2.jpg";
import bg3 from "./assets/Background3.jpg";

function DarkVariantExample() {

    const carouselItemStyle = {
        transition: 'opacity 0.5s'
      };

  return (
    <Carousel data-bs-theme="dark" className='custom-carrousel' controls={false} indicators={false}>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item  style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src={bg2}
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
          src={bg3}
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


