import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';


function Header(){
    return <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand>Welcome<SentimentVerySatisfiedOutlinedIcon/></Navbar.Brand>
      <Nav className="me-auto">
      </Nav>
    </Container>
  </Navbar>
};

export default Header;