import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  const token = localStorage.getItem("token");
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

            <li>
              <Link className="button-menu button-signout" to="/">
                <FaSignOutAlt />
                Sign Out
              </Link>
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
                            <th>ID</th>
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
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            (!search || search.length === 0) &&
                            data.map((product) => (
                              <tr key={product._id}>
                                <td>{product._id}</td>
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
                                <td>{product.description}</td>
                                <td>
                                  <img
                                    src={
                                      product.image ? product.image.url : NoData
                                    }
                                    alt="Product"
                                  />
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
                                <td>{product._id}</td>
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
                                <td>{product.description}</td>
                                <td>
                                  <img
                                    src={
                                      product.image ? product.image.url : NoData
                                    }
                                    alt="Product"
                                  />
                                </td>
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
