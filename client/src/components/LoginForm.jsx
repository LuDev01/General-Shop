import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { ImageContext } from "./context/ImageContext";
import { DataContext } from "./context/DataContext";
import CarrouselLogIn from "./CarrouselLogIn";
import Form from "react-bootstrap/Form";
import Logo from "./assets/GeneralShopLogo.png";
import CryptoJS from "crypto-js";
import axiosClient from "../axiosConfig";
import "../App.css";

export const LoginForm = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(BsFillEyeSlashFill);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState("");

  const { updateImageURLAdmin, updateImageURLClient } =
    useContext(ImageContext);

  const { setRole, setCart } = useContext(DataContext);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(BsFillEyeFill);
      setType("text");
    } else {
      setIcon(BsFillEyeSlashFill);
      setType("password");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailError("Please, enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassw(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (!errors.email && !errors.passw) {
      const passwordProcess = CryptoJS.AES.encrypt(
        passw,
        "SheDev2101200025021997"
      ).toString();

      const userLogin = {
        email: email,
        password: passwordProcess,
      };

      try {
        const response = await axiosClient.post("login", userLogin);
        const data = response.data;
        console.log("Received response from server:", data.message);
 
        function setCookie(name, value, days) {
          let expires = "";
          if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
          }
          document.cookie = `${name}=${value || ""}${expires}; path=/`;
        }
    
        if (data.message === "Welcome!") {
          setCookie("isLoggedInv3", true, 1);
          setRole(data.role);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("exp", data.exp);
          localStorage.setItem("role", data.role);
          localStorage.setItem("user",data.userId);
          localStorage.removeItem("isLoggedOut");
          const userId=localStorage.getItem('user');
          // Load the cart for the new role
          const savedCart = localStorage.getItem(`myCart_${data.role}_${userId}`);
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          } else {
            setCart([]);
          }
          if (data.role === "Admin") {
            localStorage.setItem(`AdminImg_${userId}`, data.image);
            updateImageURLAdmin(data.image);
          } else if (data.role === "Client") {
            localStorage.setItem(`ClientImg_${userId}`, data.image);
            updateImageURLClient(data.image);
          }
          setEmail("");
          setPassw("");
          window.location.reload();
          navigate("/");
        } else {
          // Authentication fails
          alert( "Authentication failed! Please check your information or create your account."    );
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          if (error.response.data.message === "Email not found") {
            setErrors({ email: "Invalid email", passw: "" });
          } else if (error.response.data.message === "Incorrect password") {
            setErrors({ email: "", passw: "Invalid password" });
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        
      }
    }
  };

  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Please, enter a valid email";
    } else {
      error.email = "";
    }

    if (!passw) {
      error.passw = "Password is required";
    } else if (passw.length < 5) {
      error.passw = "Password must be at least 5 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passw)) {
      error.passw = "Wrong password";
    } else {
      error.passw = "";
    }

    return error;
  };

  return (
    <>
      <div className="form-img">
        <Form className="login-form" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <img className="logo-img" src={Logo} alt="GeneralShop" />
          </div>
          <Form.Group className="mb-3">
            <h3 className="text-title">Log in to continue </h3>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              onChange={handleEmailChange}
              type="email"
              placeholder="example@email.com"
              id="email"
              value={email}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="  mb-3">
            <Form.Label>Password</Form.Label>
            <div className="password-field form-control">
              <input
                className="input-field"
                onChange={handlePasswordChange}
                type={type}
                placeholder="Password"
                id="passw"
                value={passw}
              />
              <span onClick={handleToggle}>{icon}</span>
            </div>
            {errors.passw && <div className="error">{errors.passw}</div>}
          </Form.Group>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="submit-button btn btn-outline-info"
            >
              Log In
            </button>
          </div>
          <div className="register-link">
            <p>Not a member?</p>
            <Link className="create-account" to="/register">
              Create an account
            </Link>
          </div>
        </Form>
        <div className="login-bg">
          <CarrouselLogIn />
        </div>
      </div>
    </>
  );
};
