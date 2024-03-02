import React from "react";
import { useState, useEffect } from "react";
import { IoIosEye } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import axiosClient from "../axiosConfig";
import "react-toastify/dist/ReactToastify.css";

import "./Dashboard.css";

export const Panel = () => {
  const [contentCard, setContentCard] = useState([
    {
      msg: "25 Daily views ",
      icon: <IoIosEye size={40} />,
    },
    {
      msg: "$ 3,000 USD Earning",
      icon: <FaMoneyBillTrendUp size={40} />,
    },
    {
      msg: "+ 200 Sales ",
      icon: <FaShoppingCart size={40} />,
    },
    {
      msg: "+ 200 customers ",
      icon: <PiUsersThreeFill size={40} />,
    },
  ]);

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(
        `users/${selectedUser._id}/update`,
        {
          userRole: newRole,
        }
      );
      console.log(response.data);
      toast.success("User role updated successfully!");
      setShow(false);
    } catch (error) {
      console.error("Error updating user role", error.message);
      toast.error("Error updating user role");
    }
  };

  return (
    <>
      <ToastContainer />
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
              <td>
                <Button variant="info" onClick={() => handleShow(el)}>
                  Change User Role
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Role Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User ID: {selectedUser?._id}
          <Dropdown onSelect={(selectedRole) => setNewRole(selectedRole)}>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              {newRole || "Select a Role"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
              <Dropdown.Item eventKey="Client">Client</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
