import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import member1 from "./assets/team/member1.png";
import member2 from "./assets/team/member2.png";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import "./AboutUs.css";

export const team = [
  {
    id: 1,
    name: "Luisa Toro",
    role: "Full Stack Web Developer",
    description:
      "Luisa is an adventurous full stack web developer with a passion for programming and an appetite for excitement. When she's not coding, you can find her immersed in the world of video games, strategizing her next move or exploring virtual landscapes. Beyond the screen, Luisa enjoys the adrenaline rush of extreme sports and the creativity of cooking up delicious meals in the kitchen. ",
    image: member1,
    socialnetwork1: "https://github.com/LuDev01",
    socialnetwork2:
      "https://www.linkedin.com/in/luisa-carolina-toro-moreno-481a01178/",
  },
  {
    id: 2,
    name: "Mariajosé Gómez",
    role: "Full Stack Web Developer",
    description:
      "Majo is a passionate full stack web developer who thrives on solving complex problems and continuously learning new technologies. With a deep love for animals and nature, she often finds inspiration for her coding projects while diving into the depths of the ocean. Majo's curiosity and dedication drive her to explore innovative solutions and push the boundaries of what's possible in web development. ",
    image: member2,
    socialnetwork1: "https://github.com/mariajgomezg",
    socialnetwork2: "https://www.linkedin.com/in/mariajgo/",
  },
];

export const AboutUs = () => {
  return (
    <>
      <NavBar />
      <h2 className=" title-text">
        The team behind General Shop: We are SheDev
      </h2>
      <p className="about-text">
        Welcome to the General Shop web application, a Colombian startup crafted
        during the Fullstack Developer bootcamp. Our primary goal is to enhance
        General Shop's digital sales channel by creating a transactional portal
        specializing in the sale of adult fashion t-shirts. The application,
        developed by our skilled team, showcases a user-friendly interface, and
        real-time order tracking for an optimized customer experience. This
        marks just the initial phase of our expansion plan. Looking ahead, we
        are committed to refining and broadening our services, introducing new
        product lines, and venturing into additional markets. Join us on this
        exciting journey with General Shop as we push the boundaries of digital
        fashion retail!
      </p>

      <Row xs={1} md={3} className="  justify-content-center  ">
        {team.map((el, idx) => (
          <Col className="team-col-card" key={idx}>
            <Card className="team-card">
              <Card.Img className=" team-img " variant="top" src={el.image} />
              <Card.Body>
                <Card.Title className="team-title">{el.name}</Card.Title>
                <div className="team-info">
                  <Card.Text>{el.role}</Card.Text>
                  <Card.Text>{el.description}</Card.Text>
                  <ul className="team-icon">
                    <li>
                      <Link to={el.socialnetwork1}>
                        <BsGithub />
                      </Link>
                    </li>
                    <li>
                      <Link to={el.socialnetwork2}>
                        <FaLinkedin />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </>
  );
};
