import Button from "react-bootstrap/Button";
import imgc9 from "../components/assets/img8.jpg";
import imgc10 from "../components/assets/img9.jpg";
import {Link, useNavigate} from "react-router-dom";
import "./CarrouselSuggestions.css";

export const CarrouselSuggestions = () => {
  const navigate=useNavigate();

  const buyProducts = (product) => {
    console.log(product);
  };

  return (
    <>
      <div>
        <div className="banner">
          <h2>
            Here we have the best tees for you with the best quality!
          </h2>
        </div>
        <div className="grid-categories-container">
          <div className="grid-categories-cell">
            <img src={imgc9} alt="Women products" className="grid-categories-image" onClick={()=>navigate("/womenProducts")}/>
            <button className="grid-categories-shop-button" onClick={()=>navigate("/womenProducts")}>Shop Women</button>
          </div>
          <div className="grid-categories-cell">
            <a href="">
              <img src={imgc10} alt="Man products" className="grid-categories-image" onClick={()=>navigate("/menProducts")} />
              <button className="grid-categories-shop-button" onClick={()=>navigate("/menProducts")}>Shop Men</button>
            </a>
          </div>
        </div>

        <div className="banner-3">
          <h2>
            All you can find in one place! General Shop. Your style, our matter.
          </h2>
          <h4>
          Explore a diverse collection of tees suitable for yourself, family, and friends.
          Our online store showcases each t-shirt as a unique piece of art, inspired 
          by a variety of themes and genres. Whether you want to express your personality, 
          make a statement, or simply feel comfortable, our t-shirt collections have something 
          for everyone. Don't miss the chance to get your hands on the best t-shirts ever 
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