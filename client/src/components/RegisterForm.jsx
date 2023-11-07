import {useState} from 'react';
import {useFetcher, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './RegisterForm.css';
import Logo from "./assets/GeneralShopLogo.png";
import { Link } from 'react-router-dom';
import CarrouselLogIn from './CarrouselLogIn';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        documentType:'',
        document:'',
        email: '',
        password: '',
        confirmPassword:'',
        // role: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        documentType: '',
        document: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [emailExists, setEmailExists] = useState(false);

    const {firstName,lastName,documentType,document,email,password,confirmPassword} = inputs

    const handleInputs = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!firstName) {
        newErrors.firstName = 'First Name is required';
        }

        if (!lastName) {
        newErrors.lastName = 'Last Name is required';
        }

        if (!documentType || documentType === 'Choose one') {
        newErrors.documentType = 'Please select a Document Type';
        }

        if (!document) {
        newErrors.document = 'Document is required';
        } else if (!/^[0-9]+$/.test(document)) {
          newErrors.document = 'Document must contain only numbers';
        }

        if (!email) {
        newErrors.email = 'Email is required';
        } 

        if (!password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
            if (!passwordRegex.test(password)) {
                newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 5 characters long';
            }
        }

        let user = {}

        if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          alert("Please check your inputs");
      } else {
          setErrors({});
          if (emailExists) {
              alert("Email is already in use");
              setInputs({
                firstName: '',
                lastName: '',
                documentType:'',
                document:'',
                email: '',
                password: '',
                confirmPassword: '',
            })
          } else {
              const user = {
                  firstName,
                  lastName,
                  documentType,
                  document,
                  email,
                  password,
                  confirmPassword
              };
              alert("Created user");

              // Send the POST request to the server only if the email does not exist
              fetch('http://localhost:5000/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  },
                  body: JSON.stringify({ ...user })
              })
                  .then(response => response.json())
                  .then(data => {
                      if (data.error && data.error === 'Email is already in use') {
                          setEmailExists(true); // Marks that the email already exists
                          alert("Email is already in use");
                      } else {
                          navigate('/login'); // Redirect the user to the login page
                      }
                  })
                  .catch(error => console.log(error));
          }
      }
  }

    return (
        <>
          <Container>
            <Form className='custom-border' onSubmit={(e) => handleSubmit(e)}>
              <div className="d-flex justify-content-center">
                <img className="logo-img-signup" src={Logo} alt="GeneralShop" />
              </div>
              <h1 className='signUp-title'>Sign Up</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  name="firstName"
                  onChange={(e) => handleInputs(e)}
                  value={firstName}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  onChange={(e) => handleInputs(e)}
                  value={lastName}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Document Type*</Form.Label>
                    <Form.Select name="documentType" onChange={(e) => handleInputs(e)} value={documentType}>
                      <option>Choose one</option>
                      <option>ID Card</option>
                      <option>Passport</option>
                      <option>Foreign ID</option>
                      <option>Other</option>
                    </Form.Select>
                    {errors.documentType && <div className="error-message">{errors.documentType}</div>}
                    </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ID"
                  name="document"
                  onChange={(e) => handleInputs(e)}
                  value={document}
                />
                {errors.document && <div className="error-message">{errors.document}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              onChange={(e) => handleInputs(e)}
              value={email}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              name="password"
              onChange={(e) => handleInputs(e)}
              value={password}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleInputs(e)}
              value={confirmPassword}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
                type="checkbox" 
                label="I agree to the Terms of Services and Privacy Policy." 
            />
          </Form.Group> */}

          <Button type="submit" variant="flat" className="submit-button btn btn-outline-info" >
            Register
          </Button>
          <div className="login-link">
            <p className="sign-in-p">Do you have an Account?</p>
            <Link className="sign-in-text" to="/login">Sign In</Link>
          </div>
        </Form>
        <div className="login-bg"> 
      <CarrouselLogIn/>
      </div>
      </Container>
    </>
  );
};
