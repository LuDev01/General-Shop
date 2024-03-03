import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSearch, ImCross, ImMenu } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { ImageContext } from "./context/ImageContext";
import CartModal from "./CartModal";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./assets/GeneralShopLogoNoSlogan.png";
import axiosClient from "../axiosConfig";
import "./NavBar.css";

export const NavBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
    if (isSearchVisible) {
      setValue("");
    }
  };

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleOnSearch = (searchItem, data) => {
    setValue(searchItem);
    navigate({ to: `/productDetails/${data._id}` });
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
    console.log("This is the data", data);
  }, [value]);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuVisible(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>

      <div className="group">
        <div>
          <ImMenu className={`menu-toggle ${isMenuVisible ? "visible" : ""}`}
          onClick={() => setIsMenuVisible(!isMenuVisible)} />
        </div>
        <div className="logo-container">
          <Link to="/">
            <img className="general-logo" src={logo} alt="" />
          </Link>
        </div>

        {isMenuVisible && (
          <div className="navigation-tabs">
            <ul className="navigation">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/womenProducts">Woman</a>
              </li>
              <li>
                <a href="/menProducts">Man</a>
              </li>
              <li>
                <a href="/aboutUs">About Us</a>
              </li>
            </ul>
          </div>
        )}

        <div>
          {isSearchVisible ? (
            <div className={`searchBox ${isSearchVisible ? "active" : ""}`}>
              <ImSearch
                className="search-product-icon"
                onClick={handleOnSearch}
              />
              <input
                type="text"
                placeholder="S E A R C H   H E R E . . . "
                value={value}
                onChange={handleOnChangeValue}
              />
              <ImCross className="close-icon" onClick={showIcon} />
            </div>
          ) : (
            <ImSearch className="search-icon" onClick={showIcon} />
          )}
        </div>
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
                  <img
                    className="dropdown-search-img"
                    src={product.image.url}
                    alt="products"
                  />
                  {product.name}
                </Link>
              ))}
          </div>
        )}
        <div className="right-navigation">
          <div className="login">
            {isLoggedIn ? (
              role === "Client" ? (
                <Nav
                  className={`user-dropdown ${
                    isMenuVisible ? "mobile-menu" : ""
                  }`}
                >
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
                <Nav
                  className={`user-dropdown ${
                    isMenuVisible ? "mobile-menu" : ""
                  }`}
                >
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
                  <NavDropdown
                    show={userDropdown}
                    className="user-dropdown-menu"
                  >
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
          </div>
          {!isSearchVisible && <CartModal />}
        </div>
      </div>
    </header>
  );
};
