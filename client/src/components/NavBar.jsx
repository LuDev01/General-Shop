import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { ImageContext } from "./context/ImageContext";
import CartModal from "./CartModal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import logo from "./assets/GeneralShopLogoNoSlogan.png";
import "./NavBar.css";
import axiosClient from "../axiosConfig";

export const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [value, setValue] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = Boolean(token);
  const { imageURL, imageURLClient } = useContext(ImageContext);

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

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleOnSearch = (searchItem) => {
    setValue(searchItem);
    console.log("searching", searchItem);
  };

  const handleOnLogOut = () => {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLoggedInv2");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("role");
    console.log("the super cookie", document.cookie);
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    navigate("/");
    window.location.reload();
  };

  const getProduct = async () => {
    try {
      const response = await axiosClient.get(`products?search=${value}`);
      setData(response.data.products);
      console.log("here the data", data);
    } catch (error) {
      console.error("Error showing product", error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [value]);

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsSearchVisible(false); // Oculta la barra de búsqueda al abrir el menú
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsDropdownVisible(!isDropdownVisible);
    setIsMenuVisible(false); // Oculta el menú al abrir la barra de búsqueda
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className={
          navbar
            ? "NavBar-color active fixed-top"
            : "NavBar-color fixed-top"
        }
      >
        <Container>
          <div className="logo-container">
            <Navbar.Brand href="/">
              <img className="general-logo" src={logo} alt="" />
            </Navbar.Brand>
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleMenuToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${isMenuVisible ? "mobile-menu" : ""}`}>
              <Nav.Link href="/" className="nav-menu-text">
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-menu-text"
                style={{ whiteSpace: "nowrap" }}
                href="/aboutUs"
              >
                About Us
              </Nav.Link>
              <NavDropdown
                title={<span className="nav-menu-text">Categories</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/womenProducts">
                  Woman
                </NavDropdown.Item>
                <NavDropdown.Item href="/menProducts">Man</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form
              className={`d-flex search-field search-container ${
                isSearchVisible ? "mobile-search" : ""
              }`}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={value}
                onChange={handleOnChangeValue}
              />
              {value && data && (
                <div className="dropdown-search">
                  {data
                    .filter((product) => {
                      const searchItems = value.toLowerCase().split(" ");
                      return searchItems.every(
                        (item) =>
                          product.name.toLowerCase().includes(item) ||
                          product.color.toLowerCase().includes(item) ||
                          product.category.toLowerCase().includes(item)
                      );
                    })
                    .slice(0, 3)
                    .map((product) => (
                      <Link
                        className="dropdown-search-row"
                        to={`/productDetails/${product._id}`}
                        onClick={() => handleOnSearch(product.name)}
                        key={product._id}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {product.name}
                        <img
                          className="dropdown-search-img"
                          src={product.image.url}
                          alt="products"
                        />
                      </Link>
                    ))}
                </div>
              )}
            </Form>

            {!isSearchVisible && (
              <ImSearch
                className="search-icon"
                onClick={handleSearchToggle}
              />
            )}

            {isLoggedIn ? (
              role === "Client" ? (
                <Nav className={`user-dropdown ${isMenuVisible ? "mobile-menu" : ""}`}>
                  <img
                    src={imageURLClient}
                    style={{
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                    }}
                    alt="profile-picture"
                    onClick={() => setUserDropdown(!userDropdown)}
                  />
                  <NavDropdown show={userDropdown} className="user-dropdown">
                    <NavDropdown.Item href="/userProfile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleOnLogOut}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : role === "Admin" ? (
                <Nav className={`user-dropdown ${isMenuVisible ? "mobile-menu" : ""}`}>
                  <img
                    src={imageURL}
                    style={{
                      borderRadius: "50%",
                      width: "3rem",
                      height: "3rem",
                    }}
                    alt="profile-picture"
                    onClick={() => setUserDropdown(!userDropdown)}
                  />
                  <NavDropdown show={userDropdown} className="user-dropdown">
                    <NavDropdown.Item href="/adminDashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleOnLogOut}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : null
            ) : (
              <div>
                <Link className="link-user" to="/login">
                  {" "}
                  <FaUserAlt className="user-icon" />{" "}
                </Link>
              </div>
            )}

            <CartModal className="cart-icon" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};



