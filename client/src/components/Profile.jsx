import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BsPersonFillGear } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { EditUser } from "./EditUser";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../axiosConfig";
import logoWhiteClient from "./assets/GeneralShopLogoWhiteClient.png";
import defaultUserImg from "./assets/DefaultUserPicture.jpg";
import "./Profile.css";

export const Profile = () => {
  const [image, setImage] = useState(defaultUserImg); // Set the initial image
  const [settings, setSettings] = useState(false);
  const [idUser, setId] = useState(" ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let id;
  useEffect(() => {
    if (token) {
      const { userId } = jwtDecode(token);
      setId(userId);
      id = userId;
      console.log("Id del usuario:", id);
    }
  }, [token]);

  const settingsRef = useRef();
  const handleChangeSettings = () => {
    setSettings(true);
    settingsRef.current.classList.add("active");
  };
  const handleOnLogOut = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedOut', 'true');
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLoggedInv2");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("role");

    console.log("the cookie",document.cookie);
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
    getUser();
  }, []);

  return (
    <>
      <div className="client-wrapper">
        <div className="client-navigation">
          <div className="client-logo-dashboard">
            <Link to="/">
              <img src={logoWhiteClient} alt="" />
            </Link>
          </div>
          <ul className="client-menu">
            <li>
              <button
                className="client-button-menu button-category active"
                ref={settingsRef}
                onClick={handleChangeSettings}
              >
                <BsPersonFillGear />
                Settings
              </button>
            </li>
            <li>
              <Link className="client-button-menu client-button-signout" onClick={handleOnLogOut}>
                <FaSignOutAlt />
                Sign Out 
              </Link>
            </li>
          </ul>
          <p className="client-text-footer">© 2024 SheDev Coding</p>
        </div>

        {settings && (
          <>
            <div className="client-main">
              <h2 className="client-principal-title">User Settings</h2>
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
