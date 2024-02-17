import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonFillGear } from "react-icons/bs";
import { EditUser } from "./EditUser";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../axiosConfig";
import logoWhiteClient from "./assets/GeneralShopLogoWhiteClient.png";
import defaultUserImg from "./assets/DefaultUserPicture.jpg";
import "./Profile.css";

export const Profile = () => {
  const [image, setImage] = useState(defaultUserImg); // Set the initial image
  const [settings, setSettings] = useState(true);
  // const [settings, setSettings] = useState(false);
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

  const getUser = async () => {
    if (!settings) return;
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


  const settingsRef = useRef();
  const handleChangeSettings = () => {
    setSettings(true);
    console.log('Settings:', settings); // Add this line
    settingsRef.current.classList.add("active");
    getUser();
  };

  useEffect(() => {
    getUser();
  }, [settings]);

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
