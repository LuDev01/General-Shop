import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Logo from "./assets/GeneralShopLogo.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { validate } from "uuid";

export const LoginForm = () => {
  
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState(BsFillEyeSlashFill);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [emailError,setEmailError]=useState('');
  const [errors, setErrors]=useState('');


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

  // const handlePasswordChange=(e)=>{
  //   setPassword(e.target.value);
  // };

const handleSubmit=(e)=>{
    const errors=validate();
    setErrors(errors);
    if(Object.keys(errors).length===0){
      alert("Done!");
    }
     
}

const validate=()=>{
  const error={};

  if(!email){
    error.email="Email is required";
  }
  if(!password){
    error.password="Password is required"
  }

  return errors
}

  return (
    <>
      <Form className="login-form">
        <div className="d-flex justify-content-center">
          <img className="logo-img" src={Logo} alt="GeneralShop" />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3 className="text-title">Log in to continue </h3>
          <Form.Label>Email</Form.Label>
          <Form.Control className={`form-control ${emailError ? 'is-invalid': ''}`}  type="email" placeholder="example@email.com" id="email" value={email} onChange={handleEmailChange}/>
          {errors.email && <div className="error">{errors.email}</div>}
        </Form.Group>

        <Form.Group className="  mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="password-field form-control">
            <input className="input-field" type={type} placeholder="Password" id="password" value={password} />
            {/* {errors.password && <div className="error">{errors.password}</div>} */}
            <span onClick={handleToggle}>
              {icon}
            </span>
          </div>
        </Form.Group>
        <div className="d-grid gap-2">
        <button type="submit" class="submit-button btn btn-outline-info" onSubmit={e => handleSubmit(e)}>Log In</button>
        </div>
      </Form>
    </>
  );
};
