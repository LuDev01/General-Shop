import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imgc1 from "../components/assets/products/img4.png";
import imgc2 from "../components/assets/products/img5.png";
import imgc3 from "../components/assets/products/img6.png";
import imgc4 from "../components/assets/products/img7.png";
import imgc5 from "../components/assets/products/img8.png";
import "./CarrouselSuggestions.css";

export const CarrouselSuggestions = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div>
        <h1 style={{textAlign:"center"}}>Latest promotions</h1>
        <Carousel responsive={responsive}>
          <div className="carrousel-card">
            <img
              className="product--image "
              src={imgc1}
              alt="Image-1-Carrousel"
            />
            <h2>Sport Tshirt</h2>
            <p className="price">$250</p>
            <p>Latest promotions 1</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div>
          <div className="carrousel-card">
            <img
              className="product--image "
              src={imgc2}
              alt="Image-1-Carrousel"
            />
            <h2>Sport Tshirt</h2>
            <p className="price">$250</p>
            <p>Latest promotions 1</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div>
          <div className="carrousel-card">
            <img
              className="product--image "
              src={imgc3}
              alt="Image-1-Carrousel"
            />
            <h2>Sport Tshirt</h2>
            <p className="price">$250</p>
            <p>Latest promotions 1</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div>
          <div className="carrousel-card">
            <img
              className="product--image "
              src={imgc4}
              alt="Image-1-Carrousel"
            />
            <h2>Sport Tshirt</h2>
            <p className="price">$250</p>
            <p>Latest promotions 1</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div>
          <div className="carrousel-card">
            <img  className="product--image " src={imgc5} alt="Image-1-Carrousel" />
            <h2>Sport Tshirt</h2>
            <p className="price">$250</p>
            <p>Latest promotions 1</p>
            <p><button>Add to Cart</button></p>
          </div>
        </Carousel>
      </div>
      ;
    </>
  );
};
