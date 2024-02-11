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
        <div className="categories-layout">
          <div className="first-block">
            <img src={imgc9} alt="img" />
          </div>
          <div className="text-block">
            <h1>Hey girl! See what we have for you</h1>
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
            <h1>Hey dude! Check this out</h1>
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