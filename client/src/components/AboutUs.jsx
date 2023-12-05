import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import member1 from "./assets/team/member1.png";
import member2 from "./assets/team/member1.png";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { NavBar } from "./NavBar";
import  "./AboutUs.css";

export const team = [
  {
    id: 1,
    name: "Luisa Toro",
    role:"Full Stack Web Developer",
    description:
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain",
    image: member1,
    socialnetwork1: "https://github.com/LuDev01",
    socialnetwork2: "https://www.linkedin.com/in/luisa-carolina-toro-moreno-481a01178/"
  },
  {
    id: 2,
    name: "Mariajosé Gómez",
    role:"Full Stack Web Developer",
    description:
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain",
    image: member2,
    socialnetwork1: "https://github.com/mariajgomezg",
    socialnetwork2: "https://www.linkedin.com/in/mariajgo/"
  },
];

export const AboutUs = () => {
  return (
    <>
     <NavBar />
      <h2   className=" title-text">The team behind General Shop: We are SheDev</h2>
      <p className="about-text">
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam

      </p>

      <Row
        xs={1}
        md={3}
        className="  justify-content-center  ">
        {team.map((el, idx) => (
          <Col  className="team-col-card" key={idx}>
            <Card className="team-card">
              <Card.Img className=" team-img " variant="top" src={el.image} />
              <Card.Body>
                <Card.Title className="team-title" >{el.name}</Card.Title>
                <div className="team-info">
                <Card.Text>{el.role}</Card.Text>
                <Card.Text>{el.description}</Card.Text>
                <ul className="team-icon">
                    <li><Link to={el.socialnetwork1}><BsGithub/></Link></li>
                    <li><Link to={el.socialnetwork2}><FaLinkedin/></Link></li>
                </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
