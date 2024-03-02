import React from "react";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <Container>
          <Row>
            <Col
              xs={12}
              md={4}
              className="footer-col1 text-center align-items-center"
            >
              <Link to="/login">
                <h3>
                  <span>GENERAL</span> SHOP
                </h3>
              </Link>
              <div className="general-shop-info">
                <p>
                  Welcome to the General Shop web application,
                  a Colombia-based startup dedicated to selling fashion products
                  over the Internet. 
                </p>
              </div>
              <div className="footer-icons d-flex justify-content-center">
                <i className="d-inline-block">
                  <BsGithub />
                </i>
                <i className="d-inline-block">
                  <FaLinkedin />
                </i>
              </div>
            </Col>
            <Col xs={12} md={4} className="footer-col2 text-center">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/womenProducts">Woman</Link>
                </li>
                <li>
                  <Link to="/menProducts">Men</Link>
                </li>
                <li>
                  <Link to="/aboutUs">About Us</Link>
                </li>
              </ul>
            </Col>
            <Col
              xs={12}
              md={4}
              className="footer-col3 text-center d-flex flex-column align-items-center"
            >
              <h3>Contact info</h3>
              <div className="contact-info d-flex justify-content-between align-items-center mb-3">
                <div className="test d-flex align-items-center">
                  <i className="contact-icon">
                    <BsFillTelephoneFill />
                  </i>
                  <p className="mb-0 ml-2">+84 575 654 678</p>
                </div>
              </div>
              <div className="contact-info d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <i className="contact-icon">
                    <IoMdMail />
                  </i>
                  <p className="mb-0 ml-2">shedev@info.com</p>
                </div>
              </div>
              <div className="contact-info d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="contact-icon">
                    <MdLocationOn />
                  </i>
                  <p className="mb-0 ml-2">Medellin, Colombia</p>
                </div>
              </div>
            </Col>
          </Row>
          <p className="footer-end">
            ©2024 Developed by SheDev | All Rights Reserved
          </p>
        </Container>
      </div>
    </>
  );
};
