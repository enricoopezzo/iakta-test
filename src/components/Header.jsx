import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Header = () => {


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Twitter-like</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/posts" className="nav-link">Posts</NavLink>
          </Nav>
          <Nav>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                <NavLink to="/register" className="nav-link">Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};