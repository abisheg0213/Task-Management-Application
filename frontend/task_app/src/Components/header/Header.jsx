import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
export default function Header(){
  const navi=useNavigate()
    return  <Navbar  style={{background:"#35a29f"}}>
    <Container>
      <Navbar.Brand onClick={(e)=>{
        e.preventDefault()
        navi('/')
      }} href="#home">
        Task Management
      </Navbar.Brand>
    </Container>
  </Navbar>
}