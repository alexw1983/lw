import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const MainNav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Lone Wolf</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/players">Players</Nav.Link>
          <Nav.Link href="/combat-log">Combat Log</Nav.Link>
          <Nav.Link href="/action-chart">Action Chart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
