import React, { useState, useEffect, useRef } from "react";
import { Link} from "react-router-dom";
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
  const [idUser, setId] = useState(" ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
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

  const settingsRef = useRef();
  const handleChangeSettings = () => {
    setSettings(true);
    console.log("Settings:", settings); // Add this line
    settingsRef.current.classList.add("active");
  };
  const getUser = async () => {
    try {
      const response = await axiosClient.get(`user/${id}`);
      const { user } = response.data;
      console.log("User data:", user); // Add this line
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
    if (settings) {
      getUser();
    }
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
                className="client-button-menu  active"
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
                key={idUser}
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
