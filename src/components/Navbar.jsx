// Navbar.js

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      {/* Prepal brand goes here */}
      <Navbar.Brand href="#home">PrepPal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button variant="outline-dark">Dark Mode</Button>
          <Button variant="outline-dark">Login/Sign Up</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;