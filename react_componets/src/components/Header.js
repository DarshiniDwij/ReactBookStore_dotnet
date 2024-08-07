import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const NavBarStyles = {
    margin: "20px",
    color: "#0E345A",

    paddingTop: "20px" /* Adjust top padding */,
    lineHeight: "3" /* Adjust line height */,
    fontSize: "20px",
    backgroundColor: "transparent",
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={NavBarStyles}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            style={{ width: "300px", height: "50px" }}
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav-link">
            <Nav.Link href="/" className="custom-nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/book" className="custom-nav-link">
              Bookstore
            </Nav.Link>
            <Nav.Link href="#bookLaunch" className="custom-nav-link">
              Events
            </Nav.Link>
            <Nav.Link href="/author" className="custom-nav-link">
              Authors
            </Nav.Link>
            {/* <NavDropdown
              title="ADD ITEM"
              id="basic-nav-dropdown"
              className="custom-nav-link"
            >
              <NavDropdown.Item href="#action/3.1">Authors</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Book</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="custom-nav-link">
                Genre
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
