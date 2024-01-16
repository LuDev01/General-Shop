import React from "react";
import { useState, useEffect } from "react";
import { IoIosEye } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axiosClient from "../axiosConfig";

import "./Dashboard.css";

export const Panel = (props) => {
  const [contentCard, setContentCard] = useState([
    {
      msg: "This is some text within a card body ",
      icon: <IoIosEye size={40} />,
    },
    {
      msg: "This is some text within a card body ",
      icon: <FaMoneyBillTrendUp size={40} />,
    },
    {
      msg: "This is some text within a card body ",
      icon: <FaShoppingCart size={40} />,
    },
    {
      msg: "This is some text within a card body ",
      icon: <PiUsersThreeFill size={40} />,
    },
  ]);
  console.log(contentCard);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axiosClient.get(`users`);
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error showing users", error.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="panel-cards">
        {contentCard.map((el, i) => (
          <Card key={el.msg + i} className="panel-cards-content">
            {el.icon}
            <Card.Body>{el.msg}</Card.Body>
          </Card>
        ))}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.firstName}</td>
              <td>{el.lastName}</td>
              <td>{el.email}</td>
              <td>{el.userRole}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
