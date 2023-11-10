import { useState,useRef } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import CarrouselLogIn from './CarrouselLogIn';
import Form from "react-bootstrap/Form";
import Logo from "./assets/GeneralShopLogo.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import bcrypt from 'bcryptjs';



export const LoginForm = () => {
  
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState(BsFillEyeSlashFill);
  const [email,setEmail]=useState('');
  const [passw,setPassw]=useState('');
  const [emailError,setEmailError]=useState('');
  const [errors, setErrors]=useState('');
  // const emailRef=useRef();
  // const passwRef=useRef();

  const navigate = useNavigate();



  const handleToggle=()=>{
    if(type==='password'){
      setIcon(BsFillEyeFill);
      setType('text')
    }
    else{
      setIcon(BsFillEyeSlashFill);
      setType('password')
    }
  }

  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
        setEmailError('Please, enter a valid email')
    }
    else{
      setEmailError('');

    }

  };

  const handlePasswordChange=(e)=>{
    setPassw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
  
//     const Eemail=email.current.value;
//     const Ppassw=passw.current.value;
 const hashedPassword=bcrypt.hashSync(passw,12);
//  window.localStorage.setItem('login',JSON.stringify(Eemail,hashedPassword))


  // // Send the request to the server
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password: hashedPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
    })
    .catch((error) => console.log(error));


    if (!errors.email && !errors.passw) {
      // Here we only continue if there are no validation errors
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: email, password: passw }),


      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Welcome!') {
            alert('Logged in successfully! Welcome to General Shop');
            setEmail('');
            setPassw('');
            navigate('/');
          } else {
            // Authentication fails
            alert('Authentication failed! Please check your information or create your account.');
            console.log("Error de else")
          }
        })
        .catch((error) => console.log(error));
    }
  };
  
  
const validate=()=>{
  const error={};

  if(!email){
    error.email="Email is required";
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error.email = "Please, enter a valid email";
  }
  else{
    error.email="";
  }

  if(!passw){
    error.passw="Password is required"
  }
  else if(passw.length<5){
    error.passw="Password must be at least 5 characters long";
  }
  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passw)){
    error.passw="Wrong password";
  }
  else {
    error.passw="";
  }

  return error;
}

return (  
    <>
    <div className="form-img">
      <Form className="login-form"  onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <img className="logo-img" src={Logo} alt="GeneralShop" />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3 className="text-title">Log in to continue </h3>
          <Form.Label>Email</Form.Label>
          <Form.Control className={`form-control ${emailError ? 'is-invalid': ''}`} onChange={handleEmailChange} type="email" placeholder="example@email.com" id="email" value={email}   />
          {errors.email && <div className="error">{errors.email}</div>}
        </Form.Group>

        <Form.Group className="  mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="password-field form-control">
            <input className="input-field" onChange={handlePasswordChange} type={type} placeholder="Password" id ="passw" value={passw}    />
            <span onClick={handleToggle}>
              {icon}
            </span>
          </div>
          {errors.passw && <div className="error">{errors.passw}</div>}
        </Form.Group>
        <div className="d-grid gap-2">
        <button type="submit" class="submit-button btn btn-outline-info">Log In</button>
        
        </div>
        <div className="register-link">
        <p>Not a member?</p>
          <Link className="create-account" to="/register">Create an account</Link>
        </div>
      </Form>
      <div className="login-bg"> 
      <CarrouselLogIn/>

      </div>
      </div>
    </>
  );
};
