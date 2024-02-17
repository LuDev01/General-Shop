import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { BsPersonFillGear } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { CreateProduct } from "./CreateProduct";
import { EditProduct } from "./EditProduct";
import { DeleteProduct } from "./DeleteProduct";
import { EditUser } from "./EditUser";
import { Panel } from "./Panel";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../axiosConfig";
import NoData from "./assets/NoData.jpg";
import logoWhite from "./assets/GeneralShopLogoWhite.png";
import Button from "react-bootstrap/esm/Button";
import "./Dashboard.css";

export const Dashboard = () => {
  const [dashboard, setDashboard] = useState(true);
  const [manageProducts, setManageProducts] = useState(false);
  const [settings, setSettings] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [idUser, setId] = useState(" ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(NoData); // Set the initial image
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState({});

  const token = localStorage.getItem("token");
  const navigate=useNavigate();
  //Pagination
  const itemsPerPage = 3;
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let id;
  useEffect(() => {
    if (token) {
      const { userId } = jwtDecode(token);
      setId(userId);
      id = userId;
      console.log("Id del usuario:", id);
    }
  }, [token]);

  const dashboardRef = useRef();
  const manageProductsRef = useRef();
  const settingsRef = useRef();

  const handleChangeDashboard = () => {
    setDashboard(true);
    setManageProducts(false);
    setSettings(false);
    dashboardRef.current.classList.add("active");
    manageProductsRef.current.classList.remove("active");
    settingsRef.current.classList.remove("active");
  };

  const handleChangeManageProducts = () => {
    setDashboard(false);
    setManageProducts(true);
    setSettings(false);
    dashboardRef.current.classList.remove("active");
    manageProductsRef.current.classList.add("active");
    settingsRef.current.classList.remove("active");
  };

  const handleChangeSettings = () => {
    setDashboard(false);
    setManageProducts(false);
    setSettings(true);
    dashboardRef.current.classList.remove("active");
    manageProductsRef.current.classList.remove("active");
    settingsRef.current.classList.add("active");
  };

  const handleInputSearch = async (e) => {
    try {
      const response = await axiosClient.get(
        `searchbyproducts?query=${e.target.value}`
      );
      setSearch(response.data.products);
    } catch (error) {
      console.log("Error during the research");
    }
  };
  
  const handleOnLogOut = () => {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLoggedInv2");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("role");


    document.cookie = "isLoggedIn=false;path=/";
    var cookies = document.cookie.split(";");
    // document.cookie = "isLoggedInv3=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    navigate("/");
    
    window.location.reload();
  };
  console.log("Mega cookie", document.cookie);
  
  const getProduct = async () => {
    try {
      const response = await axiosClient.get("products");
      setData(response.data.products);
    } catch (error) {
      console.error("Error showing product", error.message);
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosClient.get(`user/${id}`);
      const { user } = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDocumentType(user.documentType);
      setDocument(user.document);
      setEmail(user.email);
    } catch (error) {
      console.error("Error showing user", error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="navigation">
          <div className="logo-dashboard">
            <Link to="/">
              <img src={logoWhite} alt="" />
            </Link>
          </div>
          <ul className="menu">
            <li>
              <button
                className="button-menu button-category active"
                ref={dashboardRef}
                onClick={handleChangeDashboard}
              >
                <FaHome />
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="button-menu button-category"
                ref={manageProductsRef}
                onClick={handleChangeManageProducts}
              >
                <FaTshirt />
                Manage Products
              </button>
            </li>
            <li>
              <button
                className="button-menu button-category"
                ref={settingsRef}
                onClick={handleChangeSettings}
              >
                <BsPersonFillGear />
                Settings
              </button>
            </li>

          </ul>

          <p className="text-footer">© 2024 SheDev Coding</p>
        </div>
        {dashboard && (
          <>
            <div className="main">
              <h2 className="principal-title">Site Management</h2>
              <Panel />
            </div>
          </>
        )}
        {manageProducts && (
          <>
            <div className="main">
              <h2 className="principal-title">Product Management</h2>
              <div className="container ">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                  <div className="row">
                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                      <div className="search">
                        <form className="form-inline">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search Product"
                            aria-label="Search"
                            onChange={(e) => handleInputSearch(e)}
                          />
                        </form>
                      </div>
                    </div>

                    <div className="col-sm-3 offset-sm-6  mt-5 mb-4 text-gred">
                      <CreateProduct refreshProducts={getProduct} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="table-responsive ">
                      <table className="table table-striped table-hover table-bordered">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name </th>
                            <th>Category</th>
                            <th>Brand </th>
                            <th>Color </th>
                            <th>Size XS</th>
                            <th>Size S</th>
                            <th>Size M</th>
                            <th>Size L</th>
                            <th>Size XL</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th colSpan={2}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            (!search || search.length === 0) &&
                            currentItems.map((product) => (
                              <tr key={product._id}>
                                  <td>
                                    <img
                                    className="image-dashboard "
                                      src={
                                        product.image ? product.image.url : NoData
                                      }
                                      alt="Product"
                                    />
                                  </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.color}</td>
                                <td>{product.sizes.XS}</td>
                                <td>{product.sizes.S}</td>
                                <td>{product.sizes.M}</td>
                                <td>{product.sizes.L}</td>
                                <td>{product.sizes.XL}</td>
                                <td>{product.price}</td>
                                <td>
                                  {isExpanded[product._id] ? product.description : `${product.description.substring( 0,30)}...`}
                                  {product.description.length > 30 && (
                                    <Button
                                      variant="outline-info"
                                      onClick={() => setIsExpanded({...isExpanded, [product._id]: !isExpanded[product._id], }) }
                                    >
                                      {isExpanded[product._id] ? "Read Less" : "Read More"}
                                    </Button>
                                  )}
                                </td>
                                <td className="product-components">
                                  <EditProduct
                                    refreshProducts={getProduct}
                                    id={product._id}
                                    name={product.name}
                                    category={product.category}
                                    brand={product.brand}
                                    color={product.color}
                                    sizes={product.sizes}
                                    price={product.price}
                                    description={product.description}
                                    image={
                                      product.image ? product.image.url : NoData
                                    }
                                  />
                                </td>
                                <td className="product-components">
                                  <DeleteProduct
                                    id={product._id}
                                    refreshProducts={getProduct}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tbody>
                          {search.length > 0 &&
                            search.map((product) => (
                              <tr key={product._id}>
                                <td>
                                  <img
                                    src={
                                      product.image ? product.image.url : NoData
                                    }
                                    alt="Product"
                                  />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.color}</td>
                                <td>{product.sizes.XS}</td>
                                <td>{product.sizes.S}</td>
                                <td>{product.sizes.M}</td>
                                <td>{product.sizes.L}</td>
                                <td>{product.sizes.XL}</td>
                                <td>{product.price}</td>
                                <td> {isExpanded[product._id] ? product.description : `${product.description.substring( 0,30)}...`}
                                  {product.description.length > 30 && (
                                    <Button
                                      variant="outline-info"
                                      onClick={() => setIsExpanded({...isExpanded, [product._id]: !isExpanded[product._id], }) }
                                    >
                                      {isExpanded[product._id] ? "Read Less" : "Read More"}
                                    </Button>
                                  )}</td>
                                <td>
                                  <EditProduct
                                    refreshProducts={getProduct}
                                    id={product._id}
                                    name={product.name}
                                    category={product.category}
                                    brand={product.brand}
                                    color={product.color}
                                    sizes={product.sizes}
                                    price={product.price}
                                    description={product.description}
                                    image={
                                      product.image ? product.image.url : NoData
                                    }
                                  />
                                </td>
                                <td>
                                  <DeleteProduct
                                    id={product._id}
                                    refreshProducts={getProduct}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <nav>
                      <ul className="pagination  justify-content-center">
                        {Array(Math.ceil(data.length / itemsPerPage))
                          .fill()
                          .map((_, i) => (
                            <li key={i} className="page-item">
                              <a
                                onClick={() => paginate(i + 1)}
                                className="page-link"
                              >
                                {" "}
                                {i + 1}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {settings && (
          <>
            <div className="main">
              <h2 className="principal-title">User Settings</h2>
              <EditUser
                refreshUser={getUser}
                id={idUser}
                firstName={firstName}
                lastName={lastName}
                documentType={documentType}
                document={document}
                email={email}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
