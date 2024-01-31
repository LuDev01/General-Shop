import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "react-bootstrap/Button";
import imgc1 from "../components/assets/products/img8.png";
import imgc2 from "../components/assets/products/img9.png";
import imgc3 from "../components/assets/products/img10.png";
import imgc4 from "../components/assets/products/img11.png";
import imgc5 from "../components/assets/products/img12.png";
import imgc6 from "../components/assets/products/img13.png";
import imgc7 from "../components/assets/products/img14.png";
import imgc8 from "../components/assets/products/img15.png";
import imgc9 from "../components/assets/img8.jpg";
import imgc10 from "../components/assets/img9.jpg";
import "./CarrouselSuggestions.css";

import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import {Link, useNavigate} from "react-router-dom";

export const CarrouselSuggestions = () => {
  // const { data, cart, setCart } = useContext(DataContext);
  const navigate=useNavigate();

  const buyProducts = (product) => {
    console.log(product);
    // setCart([...cart, product]);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 2,
    },
  };

  const carrouselSuggestionsData = [
    {
      id: 1,
      image: imgc1,
      name: "Comfort Tee",
      price: "$120",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 2,
      image: imgc2,
      name: "Everyday Lifestyle ",
      price: "$130",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 3,
      image: imgc3,
      name: "Casual Relax ",
      price: "$90",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 4,
      image: imgc4,
      name: "Good Vibes Only",
      price: "$135",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 5,
      image: imgc5,
      name: "Mosh-Pit Vibe",
      price: "$125",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 6,
      image: imgc6,
      name: "Hardcore Lifestyle",
      price: "$250",
      descripcion: "Save 20% buying now!",
    },
    {
      id: 7,
      image: imgc7,
      name: "Free Spirit",
      price: "$115",
      descripcion: "Save 20% buying now!",
    },

    {
      id: 9,
      image: imgc8,
      name: "Rick & Morty Vibe",
      price: "$250",
      descripcion: "Save 20% buying now!",
    },
  ];

  return (
    <>
      <div>
        <div className="banner">
          <h2>
            Here we have the best promotions for you with the best quality!
            Extra 20% OFF in Christmas.
          </h2>
        </div>
        <div className="categories-layout">
          <div className="first-block">
            <img src={imgc9} alt="img" />
          </div>
          <div className="text-block">
            <h1>See what we have for you</h1>
            <h4>
              The General Shop is well known for its large and cheap t-shirt
              variety for men of all preferences and occasions. We also offer
              styling advice and ideas for brands looking for new and catchy
              content. At the General Shop, we care about you every day, and we
              want you to feel confident, comfortable and happy in your
              t-shirts. <br /> <br />
              We always provide quality products, excellent customer service,
              and free shipping and returns. We are more than just a t-shirt
              store, we are a community of t-shirt lovers.
            </h4>
            <Button
              className="text-block-button"
              variant="outline-info"
              size="lg"         
              onClick={()=>navigate("/womenProducts")}           
            >
              Shop Now
            </Button>
          </div>
          <div className="text-block">
            <h1>Check that out!</h1>
            <h4>
              We are well known for our huge and low-cost t-shirt assortment for
              men of all tastes and purposes. We also offer styling
              recommendations and solutions for brands looking for innovative
              and appealing content. At the General Shop, we care about you
              every day, and we want you to feel relaxed, awesome and
              self-assured in your t-shirts. <br /> <br />
              We always provide quality products, amazing customer service, and
              free shipping and returns. We are more than just a t-shirt store,
              we are a community of t-shirt enthusiasts.
            </h4>
            <Button
              className="text-block-button"
              variant="outline-info"
              size="lg"
              onClick={()=>navigate("/menProducts")}
            >
              Shop Now
            </Button>
          </div>
          <div className="second-block">
            <img src={imgc10} alt="img" />
          </div>
        </div>
        <div className="banner-2">
          <h2>Check our latest promotions! Don't miss them up!</h2>
        </div>

        <Carousel responsive={responsive}>
          {carrouselSuggestionsData.map((product, idx) => (
            <div className="carrousel-card" key={idx}>
              <img
                className="product--image"
                src={product.image}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p className="price">{product.price}</p>
              <p>{product.descripcion}</p>
              <p>
                <button onClick={() => buyProducts(product)}>
                  Add to Cart
                </button>
              </p>
            </div>
          ))}
        </Carousel>
        <div className="banner-3">
          <h2>
            All you can find in one place! General Shop. Your style, our matter.
          </h2>
          <h4>
            This holiday season, the General Shop has prepared a special
            surprise for all the t-shirt lovers out there. It’s a place where
            you can find the perfect t-shirt for yourself or your loved ones,
            and enjoy the amazing discounts on all our products. Browse through
            our online store and discover that each t-shirt is a piece of art,
            inspired by your favourite themes and genres. Whether you want to
            show off your personality, make a statement, or just feel
            comfortable, our t-shirt collections have something for everyone.
            Don’t miss this chance to get your hands on the best t-shirts ever,
            and join our community of t-shirt fans.
          </h4>

        </div>
        <h2 style={{marginBottom:'3rem', textAlign:'center'}}>Scroll down for more!</h2>
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
      </div>
    </>
  );
};