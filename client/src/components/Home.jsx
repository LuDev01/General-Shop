import CarrouselHome from "./CarrouselHome";
import {AllProducts} from "./AllProducts";
import { CarrouselSuggestions } from "./CarrouselSuggestions";
import {ProductsCart}  from "./ProductsCart";

export const Home = () => {
  return (
    <>
        <CarrouselHome />
        <CarrouselSuggestions/>
        <AllProducts/>
        <ProductsCart/>

        
    </>
  );
};
