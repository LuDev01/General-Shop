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
import axiosClient from "../axiosConfig";
import { jwtDecode } from "jwt-decode";
import defaultUserImg from "./assets/DefaultUserPicture.jpg";
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
  const [image, setImage] = useState(defaultUserImg); // Set the initial image
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
      const response = await axiosClient.get(`user/${id}`); // Send a GET request to your user endpoint
      const { user } = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDocumentType(user.documentType);
      setDocument(user.document);
      setEmail(user.email);

      console.log(user);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
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
              <h1>Dashboard </h1>
              <Panel/> 
            </div>
          </>
        )}
        {manageProducts && (
          <>
            <div className="main">
              <h2 className="principal-title">Site Management</h2>
              <h1>Manage Product </h1>
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
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            (!search || search.length === 0) &&
                            data.map((el) => (
                              <tr key={el._id}>
                                <td>{el._id}</td>
                                <td>{el.name}</td>
                                <td>{el.category}</td>
                                <td>{el.brand}</td>
                                <td>{el.color}</td>
                                <td>{el.size}</td>
                                <td>{el.price}</td>
                                <td>{el.quantity}</td>
                                <td>{el.description}</td>
                                <td>{el.image}</td>
                                <td className="product-components">
                                  <EditProduct
                                    refreshProducts={getProduct}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    brand={el.brand}
                                    color={el.color}
                                    size={el.size}
                                    price={el.price}
                                    quantity={el.quantity}
                                    description={el.description}
                                    image={el.image}
                                  />
                                  <DeleteProduct
                                    id={el._id}
                                    refreshProducts={getProduct}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tbody>
                          {search.length > 0 &&
                            search.map((el) => (
                              <tr key={el._id}>
                                <td>{el._id}</td>
                                <td>{el.name}</td>
                                <td>{el.category}</td>
                                <td>{el.brand}</td>
                                <td>{el.color}</td>
                                <td>{el.size}</td>
                                <td>{el.price}</td>
                                <td>{el.quantity}</td>
                                <td>{el.description}</td>
                                <td>{el.image}</td>
                                <td>
                                  <EditProduct
                                    refreshProducts={getProduct}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    brand={el.brand}
                                    color={el.color}
                                    size={el.size}
                                    price={el.price}
                                    quantity={el.quantity}
                                    description={el.description}
                                    image={el.image}
                                  />
                                  <DeleteProduct
                                    id={el._id}
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
              <h2 className="principal-title">Site Management</h2>
              <h1>Settings </h1>

              <EditUser
                refreshUser={getUser}
                id={idUser}
                firstName={firstName}
                lastName={lastName}
                documentType={documentType}
                document={document}
                email={email}
              />
              <div>
                <img
                  src={image}
                  style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                  alt="profile"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
