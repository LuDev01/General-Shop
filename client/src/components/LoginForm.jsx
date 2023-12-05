import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CarrouselLogIn from './CarrouselLogIn';
import Form from "react-bootstrap/Form";
import Logo from "./assets/GeneralShopLogo.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import CryptoJS from "crypto-js";

export const LoginForm = () => {

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(BsFillEyeSlashFill);
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(BsFillEyeFill);
      setType('text')
    }
    else {
      setIcon(BsFillEyeSlashFill);
      setType('password')
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailError('Please, enter a valid email')
    }
    else {
      setEmailError('');

    }

  };

  const handlePasswordChange = (e) => {
    setPassw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (!errors.email && !errors.passw) {

      console.log("Sending request with email and password:", email, passw);
      const passwordProcess = CryptoJS.AES.encrypt(passw, 'secret key 123').toString();
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

        body: JSON.stringify({ email: email, password: passwordProcess }),
        // body: JSON.stringify({ email: email, password: hashedPassword }), 

      })
        .then((response) => response.json())
        .then((data) => {

          console.log("Received response from server:", data.message);
          console.log(data);

          // window.sessionStorage.setItem("isLoggedInv2",true)

          function setCookie(name, value, days) {
            let expires = '';
            if (days) {
              const date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              expires = `; expires=${date.toUTCString()}`;
            } document.cookie = `${name}=${value || ''}${expires}; path=/`;
          }

          if (data.message === 'Welcome!') {
            setCookie('isLoggedInv3', true, 1);
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem('token', data.token)
            localStorage.setItem('exp', data.exp)
            setEmail('');
            setPassw('');
            window.location.reload();
            navigate('/');
          } else {
            // Authentication fails
            alert('Authentication failed! Please check your information or create your account.');
            console.log("Error de else")
            console.log(passw);
          }
        })
        .catch((error) => console.log(error));

    }
  };


  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email is required";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Please, enter a valid email";
    }
    else {
      error.email = "";
    }

    if (!passw) {
      error.passw = "Password is required"
    }
    else if (passw.length < 5) {
      error.passw = "Password must be at least 5 characters long";
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passw)) {
      error.passw = "Wrong password";
    }
    else {
      error.passw = "";
    }

    return error;
  }

  return (
    <>
      <div className="form-img">
        <Form className="login-form" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <img className="logo-img" src={Logo} alt="GeneralShop" />
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h3 className="text-title">Log in to continue </h3>
            <Form.Label>Email</Form.Label>
            <Form.Control className={`form-control ${emailError ? 'is-invalid' : ''}`} onChange={handleEmailChange} type="email" placeholder="example@email.com" id="email" value={email} />
            {errors.email && <div className="error">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="  mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-field form-control">
              <input className="input-field" onChange={handlePasswordChange} type={type} placeholder="Password" id="passw" value={passw} />
              <span onClick={handleToggle}>
                {icon}
              </span>
            </div>
            {errors.passw && <div className="error">{errors.passw}</div>}
          </Form.Group>
          <div className="d-grid gap-2">
            <button type="submit" className="submit-button btn btn-outline-info">Log In</button>

          </div>
          <div className="register-link">
            <p>Not a member?</p>
            <Link className="create-account" to="/register">Create an account</Link>
          </div>
        </Form>
        <div className="login-bg">
          <CarrouselLogIn />

        </div>
      </div>
    </>
  );
};
