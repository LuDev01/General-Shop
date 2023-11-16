import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import './NavBar.css';
import logo from './assets/GeneralShopLogoNoSlogan.png';
import {ImSearch} from 'react-icons/im'
import { useState,useEffect} from "react";
import CartModal from './CartModal';
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


export const NavBar = () => {
const [navbar,setNavbar]=useState(false);
const [isSearchVisible, setIsSearchVisible] = useState(false);
const [search,setSearchBtn]=useState({
  transition:"all .3s ease",
  opacity:0,
  showSearchButton:true,
});
const showIcon = () => {
 
  setSearchBtn((prevSearch) => ({
    ...prevSearch,
    opacity: isSearchVisible ? 0 : 1,
   
  }));
  setIsSearchVisible(!isSearchVisible);
  
};

const changeBackground=()=>{
 if(window.scrollY>=80){
  setNavbar(true)
  console.log(window.scrollY);
 }
 else{
  setNavbar(false)
 };

};

window.addEventListener('scroll',changeBackground)
  return (

    <Navbar expand="lg" className={navbar ? 'NavBar-color active fixed-top': 'NavBar-color fixed-top'} >
      <Container >
        <div className="logo-container">
        <Navbar.Brand href="/"><img className="general-logo" src={logo} alt="" /></Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav   style={{ position: "relative",right:90  }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link style={{whiteSpace: "nowrap" }} href="/aboutUs" >About Us</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/womenProducts">Woman</NavDropdown.Item>
              <NavDropdown.Item href="/menProducts">Man</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Latest Promotions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex search-field" style={{ opacity: search.opacity, transition: search.transition }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />

          </Form>
          {search.showSearchButton ? (<ImSearch className="search-icon" onClick={showIcon}/>) : null }
        <Link className="link-user" to="/login"> <FaUserAlt className="user-icon"/> </Link>

           <CartModal/>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  )
}
