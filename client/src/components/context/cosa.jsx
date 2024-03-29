// import { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ImSearch } from "react-icons/im";
// import { FaUserAlt } from "react-icons/fa";
// import { ImageContext } from "./context/ImageContext";
// import { MdMenu } from "react-icons/md";
// import CartModal from "./CartModal";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import logo from "./assets/GeneralShopLogoNoSlogan.png";
// import "./NavBar.css";
// import axiosClient from "../axiosConfig";


// export const NavBar = () => {
//   const [navbar, setNavbar] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [value, setValue] = useState("");
//   const [userDropdown, setUserDropdown] = useState(false);
//   const [data, setData] = useState([]);
//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isLoggedIn = Boolean(token);
//   const { imageURL, imageURLClient } = useContext(ImageContext);

//   const [search, setSearchBtn] = useState({
//     transition: "all .3s ease",
//     opacity: 0,
//     showSearchButton: true,
//   });

//   const showIcon = () => {
//     setSearchBtn((prevSearch) => ({
//       ...prevSearch,
//       opacity: isSearchVisible ? 0 : 1,
//     }));
//     setIsSearchVisible(!isSearchVisible);
//     setIsDropdownVisible(!isDropdownVisible);
//   };

//   const handleOnChangeValue = (e) => {
//     setValue(e.target.value);
//   };

//   const handleOnSearch = (searchItem, id) => {
//     setValue(searchItem);
//     navigate({to: `/${id}`})
//     console.log("searching", searchItem);
//   };

//   const handleOnLogOut = () => {
//     localStorage.setItem("isLoggedOut", "true");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("isLoggedInv2");
//     localStorage.removeItem("token");
//     localStorage.removeItem("exp");
//     localStorage.removeItem("role");
//     console.log("the super cookie", document.cookie);
//     var cookies = document.cookie.split(";");

//     for (var i = 0; i < cookies.length; i++) {
//       var cookie = cookies[i];
//       var eqPos = cookie.indexOf("=");
//       var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//       document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     }
//     navigate("/");
//     window.location.reload();
//   };

//   const getProduct = async () => {
//     try {
//       const response = await axiosClient.get(`products?search=${value}`);
//       setData(response.data.products);
//       console.log("here the data", data);
//     } catch (error) {
//       console.error("Error showing product", error.message);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, [value]);

//   const handleMenuToggle = () => {
//     setIsMenuVisible(!isMenuVisible);
//     setIsSearchVisible(false); // Oculta la barra de búsqueda al abrir el menú
//   };

//   const handleSearchToggle = () => {
//     setIsSearchVisible(!isSearchVisible);
//     setIsDropdownVisible(!isDropdownVisible);
//     setIsMenuVisible(false); // Oculta el menú al abrir la barra de búsqueda
//   };

//   return (
//     <div>
//       <Navbar
//         expand="lg"
//         className={
//           navbar
//             ? "NavBar-color active fixed-top"
//             : "NavBar-color fixed-top"
//         }
//       >
//         <Container>
//           <div className="logo-container">
//             <Navbar.Brand href="/">
//               <img className="general-logo" src={logo} alt="" />
//             </Navbar.Brand>
//           </div>
//           <Navbar.Toggle
//             aria-controls="basic-navbar-nav"
//             className="basic-navbar-nav"
//             onClick={handleMenuToggle}
//           />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className={`me-auto ${isMenuVisible ? "mobile-menu" : ""}`}>
//               <Nav.Link href="/" className="nav-menu-text">
//                 Home
//               </Nav.Link>
//               <Nav.Link
//                 className="nav-menu-text"
//                 style={{ whiteSpace: "nowrap" }}
//                 href="/aboutUs"
//               >
//                 About Us
//               </Nav.Link>
//               <NavDropdown
//                 title={<span className="nav-menu-text">Categories</span>}
//                 id="basic-nav-dropdown"
//               >
//                 <NavDropdown.Item href="/womenProducts">
//                   Woman
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="/menProducts">Man</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Form
//               className={`d-flex search-field search-container ${
//                 isSearchVisible ? "mobile-search" : ""
//               }`}
//             >
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//                 value={value}
//                 onChange={handleOnChangeValue}
//               />
//               {value && data && (
//                 <div className="dropdown-search">
//                   {data
//                     .filter((product) => {
//                       const searchItems = value.toLowerCase().split(" ");
//                       return searchItems.every(
//                         (item) =>
//                           product.name.toLowerCase().includes(item) ||
//                           product.color.toLowerCase().includes(item) ||
//                           product.category.toLowerCase().includes(item)
//                       );
//                     })
//                     .slice(0, 3)
//                     .map((product) => (
//                       <Link
//                         className="dropdown-search-row"
//                         to={`/productDetails/${product._id}`}
//                         onClick={() => handleOnSearch(product.name)}
//                         key={product._id}
//                         style={{
//                           textDecoration: "none",
//                           color: "black",
//                         }}
//                       >
//                         {product.name}
//                         <img
//                           className="dropdown-search-img"
//                           src={product.image.url}
//                           alt="products"
//                         />
//                       </Link>
//                     ))}
//                 </div>
//               )}
//             </Form>

//             {!isSearchVisible && (
//               <ImSearch
//                 className="search-icon"
//                 onClick={handleSearchToggle}
//               />
//             )}

//             {isLoggedIn ? (
//               role === "Client" ? (
//                 <Nav className={`user-dropdown ${isMenuVisible ? "mobile-menu" : ""}`}>
//                   <img
//                     src={imageURLClient}
//                     style={{
//                       borderRadius: "50%",
//                       width: "32px",
//                       height: "32px",
//                     }}
//                     alt="profile-picture"
//                     onClick={() => setUserDropdown(!userDropdown)}
//                   />
//                   <NavDropdown show={userDropdown} className="user-dropdown">
//                     <NavDropdown.Item href="/userProfile">
//                       Profile
//                     </NavDropdown.Item>
//                     <NavDropdown.Item onClick={handleOnLogOut}>
//                       Log Out
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               ) : role === "Admin" ? (
//                 <Nav className={`user-dropdown ${isMenuVisible ? "mobile-menu" : ""}`}>
//                   <img
//                     src={imageURL}
//                     style={{
//                       borderRadius: "50%",
//                       width: "3rem",
//                       height: "3rem",
//                     }}
//                     alt="profile-picture"
//                     onClick={() => setUserDropdown(!userDropdown)}
//                   />
//                   <NavDropdown show={userDropdown} className="user-dropdown">
//                     <NavDropdown.Item href="/adminDashboard">
//                       Dashboard
//                     </NavDropdown.Item>
//                     <NavDropdown.Item onClick={handleOnLogOut}>
//                       Log Out
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               ) : null
//             ) : (
//               <div>
//                 <Link className="link-user" to="/login">
//                   {" "}
//                   <FaUserAlt className="user-icon" />{" "}
//                 </Link>
//               </div>
//             )}

//             <CartModal  />
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// };

// .NavBar-color{
//   /* background-color: white; */
//   background-color: black;
//   color: var(--white-main);
//   /* opacity: 0.8; */
//   transition: all 500ms;
// }

// .nav-menu-text{
//   color:white  !important;
// }

// .general-logo{
//   max-width: 15vh;
// }


// .logo-container{
//   margin-right:60vh ;
// }

// .search-icon{
//   margin-right:  40px;
//   cursor: pointer;
//   font-size: 1.2rem;
// }

// .user-icon{
//   margin-right: 30px;
//   cursor: pointer;
//   color:white;
//   font-size: 1.2rem;
// }

// .cart-icon{
//   margin-right: 30px;
//   cursor: pointer;
//   font-size: 1.2rem;
// }

// .log-out-icon{
//   margin-right: 40px;
//   cursor: pointer;
// }

// .link-user{
//   color: #000;
// }

// .search-container{
//   margin-left: -3rem;
//   width:220px;
// }

// .dropdown-search{
//   display: flex;
//   flex-direction: column;
//   position:absolute;
//   border-radius: 5px;
//   top: 4rem; /* Position the dropdown-search below the search button */
//   width: 18%;
//   background-color: white;
// }

// .dropdown-search:empty{
//   border: none;
// }
// .dropdown-search-row{
//   cursor: pointer;
//   text-align: start;
//   padding: 2px;
//   margin-left: 10px;
// }
// .dropdown-search-img{
//   margin-left: 2rem;
//   max-width: 4.5rem;
// }

// .user-dropdown .dropdown-toggle::after{
//   display: none;
// }

// /* MEDIA QUERIES CON FONDO BLANCO CUANDO SEA UNA PANTALLA PEQUEÑA */
// @media (max-width: 768px) {
//   .logo-container {
//     margin-right: 0;
//     text-align: right; /* Alinea el logo a la derecha */
//   }

//   .general-logo {
//     max-width: 80px; /* Ajusta el tamaño del logo según sea necesario */
//   }

//   .navbar-toggler {
//     order: -1; /* Cambia el orden del botón de hamburguesa para que aparezca primero */
//   }

//   .navbar-collapse {
//     padding-top: 10px; /* Añade un espacio superior en la barra de navegación */
//   }

//   .navbar-nav {
//     width: 100%;
//     flex-direction: column; /* Cambia la dirección de la columna para el menú en pantallas pequeñas */
//   }

//   /* .navbar-toggler-icon {
//     background-color: white !important; 
//   } */

//   .basic-navbar-nav{
//       color: white;
//   }

//   .nav-menu-text {
//     padding: 10px; /* Añade espacio alrededor de los elementos del menú */
//   }

//   .user-dropdown,
//   .cart-icon {
//     margin-top: 10px; /* Ajusta el espacio entre los elementos del menú */
//   }

//   .search-icon {
//     margin-top: 10px; /* Ajusta el espacio entre el icono de búsqueda y los elementos del menú */
//   }

//   .search-container {
//     margin-left: 0;
//     width: 100%; /* Ajusta el ancho de la barra de búsqueda en pantallas pequeñas */
//   }

//   .dropdown-search {
//     width: 100%; /* Ajusta el ancho del menú desplegable de búsqueda en pantallas pequeñas */
//   }
// }



