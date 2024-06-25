import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
export default function Header(){
    return  <Navbar  style={{background:"#35a29f"}}>
    <Container>
      <Navbar.Brand href="#home">
        To-Do Management
      </Navbar.Brand>
    </Container>
  </Navbar>
}