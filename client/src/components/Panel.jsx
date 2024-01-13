import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { IoIosEye } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";

import "./Dashboard.css";

export const Panel = () => {
  const [contentCard, setContentCard] = useState([
    { msg: "This is some text within a card body ", icon: <IoIosEye size={40}/> },
    { msg: "This is some text within a card body ", icon: <FaMoneyBillTrendUp size={40} /> },
    { msg: "This is some text within a card body ", icon: <FaShoppingCart size={40} /> },
    { msg: "This is some text within a card body ", icon: <PiUsersThreeFill size={40} /> },
  ]);
  console.log(contentCard);

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
    </>
  );
};
