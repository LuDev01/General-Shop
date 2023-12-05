import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imgc1 from "../components/assets/products/img8.png";
import imgc2 from "../components/assets/products/img9.png";
import imgc3 from "../components/assets/products/img10.png";
import imgc4 from "../components/assets/products/img11.png";
import imgc5 from "../components/assets/products/img12.png";
import imgc6 from "../components/assets/products/img13.png"
import imgc7 from "../components/assets/products/img14.png"
import imgc8 from "../components/assets/products/img15.png"
import "./CarrouselSuggestions.css";

import { useContext } from "react";
import { dataContext } from "./context/DataContext";

export const CarrouselSuggestions = () => {
  const { data, cart, setCart } = useContext(dataContext);

  const buyProducts = (product) => {
      console.log(product)
      setCart([...cart, product])
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide:2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide:2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide:2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide:2,
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
        <h1 style={{ textAlign: "center" ,margin:"2rem", color:"orange", fontWeight:"bold"}}>Latest promotions</h1>
        <Carousel  responsive={responsive}>
          {carrouselSuggestionsData.map((product,idx) => (
            <div className="carrousel-card"  key={idx}>
              <img className="product--image" src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p className="price">{product.price}</p>
                <p>{product.descripcion}</p>
                <p><button onClick={() => buyProducts(product)}>Add to Cart</button></p>
              </div>
          ))}
        </Carousel>
      </div>
      
    </>
  );
};
