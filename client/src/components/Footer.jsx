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
        <Container >
          <Row>
            <Col className="footer-col1">
              <Link to="/login">
                <h3>
                  <span>GENERAL</span> SHOP
                </h3>
              </Link>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
                porro aut in ducimus modi molestias nam adipisci laborum,
                voluptas illum a deserunt temporibus! Nemo, veniam deserunt?
                Dolorem eum veritatis voluptatum?
              </p>

              <div className="footer-icons">
                <i>
                  <BsGithub />
                </i>
                <i>
                  <FaLinkedin />
                </i>
              </div>
            </Col>
            <Col className="footer-col2">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/">Become a partner</Link>
                </li>
              </ul>
            </Col>
            <Col className="footer-col3">
              <h3>Contact info</h3>
              <i>
                <BsFillTelephoneFill />
              </i>
              <p>+84 575 654 678</p>
              <i>
                <IoMdMail />
              </i>
              <p>shedev@info.com</p>
              <i>
                <MdLocationOn />
              </i>
              <p>Medellin, Colombia</p>
            </Col>
          </Row>
          <p className="footer-end">©2024 Developed by SheDev | All Rights Reserved</p>
        </Container>
      </div>

    </>
  );
};
