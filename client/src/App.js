import './App.css'; // Imports the CSS file for styling the App component.
import { BrowserRouter as Router, Routes,Route } from "react-router-dom"; //Imports components and utilities from the react-router-dom library. Specifically, it imports BrowserRouter as Router, Routes, and Route. These components are used for setting up client-side routing in a React application.
import { HomePage } from './pages/HomePage';
import { RegisterForm } from './components/RegisterForm';
import {LogIn} from './pages/LogIn';
import {ProductDetails} from './components/ProductDetails';
import { AboutUs } from './components/AboutUs';
import { WomenProducts } from './components/WomenProducts';
import { MenProducts } from './components/MenProducts';

function App() { // Defines the App component, which serves as the main component for the React application.
  return (
    <Router> {/*Starts the router context provided by BrowserRouter. This allows you to use features like navigation and route matching.*/}
      {/* <NavBar/> */}
    <div className="App"> {/*Provide a container for the main content of the application.*/}
    <Routes> {/*Sets up a container for defining different routes in the application.*/}
      <Route path='/' element={<HomePage/>}/> {/*Defines a route for the root path / that renders the HomePage component when the root path is matched.*/}
      <Route path= '/register' element={<RegisterForm/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/aboutUs' element={<AboutUs/>}/>
      <Route path='/productDetails/:productId' element={<ProductDetails/>}/>
      <Route path='/womenProducts' element={<WomenProducts/>}/>
      <Route path='/menProducts' element={<MenProducts/>}/>

    </Routes>
    </div>
    </Router>
  );
}
export default App; //xports the App component as the default export, making it available for use in other parts of the application.

