import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {

    const NavBarStyles = {
        margin : '10px',
        
        paddingTop: '10px', /* Adjust top padding */
        lineHeight: '3' ,/* Adjust line height */
        fontSize : '15px',
        backgroundColor : '#0E345A'
       
     };

    return (
      <Navbar  style={NavBarStyles}>
        <Container>
          <Navbar.Text style={{color:'whitesmoke'}}>
            &copy; {new Date().getFullYear()} By BINK. Publishers.Powered and secured by PluralSight.
          </Navbar.Text>
        </Container>
      </Navbar>
    );
  };
  
  export default Footer;
  