import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import "./NavBar.css";
import logo from "./assets/GeneralShopLogoNoSlogan.png";
import { ImSearch } from "react-icons/im";
import { useState} from "react";
import CartModal from "./CartModal";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { products } from "./Products";

export const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [value, setValue]=useState('');

  const [search, setSearchBtn] = useState({
    transition: "all .3s ease",
    opacity: 0,
    showSearchButton: true,
  });

  const showIcon = () => {
    setSearchBtn((prevSearch) => ({
      ...prevSearch,
      opacity: isSearchVisible ? 0 : 1,
    }));
    setIsSearchVisible(!isSearchVisible);
    setIsDropdownVisible(!isDropdownVisible);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
      console.log(window.scrollY);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const handleOnChangeValue=(e)=>{
    setValue(e.target.value);
  };

const handleOnSearch=(searchItem)=>{
  setValue(searchItem);
  console.log('searching', searchItem);
};

  return (
    <>
   
    <Navbar
      expand="lg"
      className={
        navbar ? "NavBar-color active fixed-top" : "NavBar-color fixed-top"
      }
    >
      <Container>
        <div className="logo-container">
          <Navbar.Brand href="/">
            <img className="general-logo" src={logo} alt="" />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ position: "relative", right: 90 }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link style={{ whiteSpace: "nowrap" }} href="/aboutUs">
              About Us
            </Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/womenProducts">Woman</NavDropdown.Item>
              <NavDropdown.Item href="/menProducts">Man</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Latest Promotions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      {/* <div className="search-container"> */}
          <Form
            className="d-flex search-field search-container"
            style={{ opacity: search.opacity, transition: search.transition }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={value}
              onChange={handleOnChangeValue}
             
            />

            <div className="dropdown-search">
            {products.filter(el=>{
              const searchItem=value.toLowerCase();
              const itemName=el.name.toLowerCase();
              // return searchItem && itemName.startsWith(searchItem) && itemName!==searchItem
              return searchItem && itemName.includes(searchItem.toLowerCase()) && itemName!==searchItem
            }).slice(0,3)
            
            .map((el)=>(
              <Link className="dropdown-search-row"  to={`/productDetails/${el.id}`} onClick={()=>handleOnSearch(el.name)} key={el.id}   style={{ textDecoration: "none", color:"black" }}>
                {el.name}
                 <img  className="dropdown-search-img" src={el.image} alt="products" />
                 </Link>       
            ))}
            </div>
          </Form>

          {search.showSearchButton ? (
            <ImSearch className="search-icon" onClick={showIcon}  />
          ) : null}
          <Link className="link-user" to="/login">
            {" "}
            <FaUserAlt className="user-icon" />{" "}
          </Link>

          <CartModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};
