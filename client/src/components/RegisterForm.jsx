import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './RegisterForm.css';
import Logo from "./assets/GeneralShopLogo.png";
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        documentType:'',
        document:'',
        email: '',
        password: '',
        // role: ''
    });

    const {firstName,lastName,documentType,document,email,password} = inputs

    const handleInputs = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            firstName,
            lastName,
            documentType,
            document,
            email,
            password
        }

        fetch('http://localhost:5000/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...user})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

        setInputs({
            firstName: '',
            lastName: '',
            documentType:'',
            document:'',
            email: '',
            password: '',
        })
        alert("Created user")
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
                    <Form.Control type="text" placeholder="John" name="firstName" onChange={(e) => handleInputs(e)} value={firstName}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control type="text" placeholder="Doe" name="lastName" onChange={(e) => handleInputs(e)} value={lastName}/>
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
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='test'>Number*</Form.Label>
                            <Form.Control type="text" placeholder="Your ID" name="document" onChange={(e) => handleInputs(e)} value={document}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="email" placeholder="Your email address" name="email" onChange={(e) => handleInputs(e)} value={email}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Your Password" name="password" onChange={(e) => handleInputs(e)} value={password}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I agree to the Terms of Services and Privacy Policy." />
                </Form.Group>

                <Button type="submit" variant="flat" className="submit-button btn btn-outline-info">
                    Register
                </Button>
                <div className="login-link">
                    <p className="sign-in-p">Do you have an Account?</p>
                    <Link className="sign-in-text" to="/login">Sign In</Link>
                </div>
            </Form>
        </Container>
    </>
  )
}
