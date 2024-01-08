import CarrouselHome from "./CarrouselHome";
import {AllProducts} from "./AllProducts";
import { CarrouselSuggestions } from "./CarrouselSuggestions";
import {ProductsCart}  from "./ProductsCart";

export const Home = () => {
  return (
    <>
        <CarrouselHome />
        <div style={{background:'#f3f3f3'}}>
        <CarrouselSuggestions/>
        <AllProducts/>
        <ProductsCart/>
        
        </div>
        
    </>
  );
};
