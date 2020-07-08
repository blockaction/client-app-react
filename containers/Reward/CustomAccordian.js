import React from "react";
import { Row, Col, Form, Accordion, Card, Button } from "react-bootstrap";

const CustomAccordian = props => {

    const { handleAccordianClick, open, dynamicClass, title } = props;
 
    return (
      <div className={dynamicClass}>
         <button>toggle</button>
        <div className="custom-accordian-head" onClick={handleAccordianClick}>{title}</div>
        <div className="articlewrap">
          <div className="article">
            {props.children}
          </div>
        </div>
    </div>
  );
};

export default CustomAccordian;
