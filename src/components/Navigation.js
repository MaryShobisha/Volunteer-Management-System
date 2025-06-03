import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import "./Navigation.css";
import profile from "../assets/profile.png";


function Navigation(params) {
  const location = useLocation();
  const navigate = useNavigate()
  const handleLogout = () => {
    // 1. Remove the token
    localStorage.removeItem("jwtToken");
    // 2. Redirect to /login
    navigate("/");

  };
  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const {userType} = params
  // console.log(userType);

  return (
    <Navbar bg="white" expand="lg" className="navbar-custom shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <span>Volunteer</span>
          <span className="brand-link">Link</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
            {userType === 'admin'&&<>
            <Nav className="mx-4">
            <Nav.Link
              as={Link}
              to="/admindashboard"
              className={`nav-link-custom mx-3 ${
                isActive("/admindashboard") ? "active" : ""
              }`} 
            >
              Admin Dashboard
            </Nav.Link>
            </Nav>
            <div className="ms-auto d-flex align-items-center">
              
              <Dropdown align="end">
                <Dropdown.Toggle as="div" className="profile-dropdown-toggle">
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle profile-img"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="profile-dropdown-menu">
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div></>

}
            {userType === 'volunteer'&& <>
            <Nav className="mx-4">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-custom mx-3 ${
                isActive("/") ? "active" : ""
              }`}
            >
              Dashboard
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/myprojects"
              className={`nav-link-custom mx-3 ${
                isActive("/myprojects") ? "active" : ""
              }`}
            >
              My Projects
            </Nav.Link>
            </Nav>
            <div className="ms-auto d-flex align-items-center">
              <a href="/#projects">
            <Button variant="primary" className="find-project-btn">
              Find Project
            </Button></a>
            <div className="ms-3">
              <Dropdown align="end">
                <Dropdown.Toggle as="div" className="profile-dropdown-toggle">
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle profile-img"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="profile-dropdown-menu">
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/calendar">
                    Calendar
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/messages">
                    Messages
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/loyalty-points">
                    Loyalty Points
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/badges">
                    My Badges
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
          </div>
          
          
          </>}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
