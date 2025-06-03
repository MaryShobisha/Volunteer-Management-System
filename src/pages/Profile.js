"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Nav,
  Tab,
  Spinner,
  Alert
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from "react-router-dom";

export default function Profile(userData) {
  const userDetails = userData.userData.currentUser;
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [profile,setProfile] = useState(userDetails.profileImage)
  const [address, setAddress] = useState(userDetails.address);
  const [contactNumber, setContactNumber] = useState(userDetails.contactNumber);
  const [joinDate] = useState(userDetails.createdAt);
  const [emergencyContactName,setEmergencyContactName] = useState(userDetails.emergencyContactName);
  const [emergencyContactNumber,setEmergencyContactNumber] = useState(userDetails.emergencyContactNumber);
  const [interactionsCount] = useState(1234);
  const [formData, setFormData] = useState({ "currentPassword":"","newPassword":"" , "confirmPassword":""})
  console.log(userData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserDetails = {
      "fullName": name,
      "email": email,
      "dob": userDetails.dob,
      "contactNumber": contactNumber,
      "address": address,
      "emergencyContactName": emergencyContactName,
      "emergencyContactNumber": emergencyContactNumber,
      }
    try {
      setPersonalError('');
  setPersonalMessage('');
      const token = localStorage.getItem('jwtToken'); 

      const response = await fetch(
        'http://localhost:3200/api/users/profile',{
        method: 'PUT',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newUserDetails)
      });
      const data = await response.json()
        if (!response.ok) {
    setPersonalError(data.message || 'Something went wrong.');
    setTimeout(() => setPersonalError(''), 1000);
  } else {
    setPersonalMessage(data.message || 'Profile updated successfully.');
    setTimeout(() => setPersonalMessage(''), 1000);
  }
    } catch (err) {
       setPersonalError('An unexpected error occurred.');
  setTimeout(() => setPersonalError(''), 1000);
    }
  };
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [personalError, setPersonalError] = useState('');
  

  const handleChange = (e) => {
    setFormData({
      "currentPassword":e.target.currentPassword.value,
      "newPassword":e.target.newPassword.value,
      "confirmPassword":e.target.confirmPassword.value
  });
    console.log(formData)
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    handleChange(e)
    setMessage('');
    setError('');
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      console.log(newPassword,confirmPassword)
      return;
    }

    try {

      const token = localStorage.getItem('jwtToken'); 

      const response = await fetch(
        'http://localhost:3200/api/users/change-password',{
        method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword
        })
      });
      const data = await response.json()
     if (!response.ok) {
    setError(data.message || 'Something went wrong.');
    setTimeout(() => setError(''), 1000);
  } else {
    setMessage(data.message || 'Profile updated successfully.');
    setTimeout(() => setMessage(''), 1000);
  }
    } catch (err) {
       setError('An unexpected error occurred.');
  setTimeout(() => setError(''), 1000);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <div className="mb-3">
                <div className="mx-auto" >
                  <img
                  style={{ width: '100px', height: '100px' }}
                    src={profile}
                    alt="Profile picture"
                    layout="fill"
                    className="rounded-circle object-cover"
                  />
                </div>
              </div>
              <h4 className="card-title">{name}</h4>
              <p className="text-muted mb-1">{email}</p>
              <p className="text-muted">{address}</p>
              <hr />
              <p className="mb-1"><small>Member since: {joinDate}</small></p>
              <p><small>Total interactions: {interactionsCount}</small></p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
          <Tab.Container defaultActiveKey="personal">
            <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="personal">Personal Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="account">Account Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="personal">
                    <Form onSubmit={handleSubmit}>
                      {personalMessage && <Alert variant="success">{personalMessage}</Alert>}
                      {personalError && <Alert variant="danger">{personalError}</Alert>}
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="address" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="contactNumber" className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          pattern="07[0-9]{8}"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="emergencyContactName" className="mb-3">
                        <Form.Label>Emergency Contact Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={emergencyContactName}
                          onChange={(e) => setEmergencyContactName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="contactNumber" className="mb-3">
                        <Form.Label>Emergency Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          pattern="07[0-9]{8}"
                          value={emergencyContactNumber}
                          onChange={(e) => setEmergencyContactNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="submit" className="w-100">
                        Update Profile
                      </Button>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="account">
                     <Form onSubmit={handlePasswordSubmit}>
                      {message && <Alert variant="success">{message}</Alert>}
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form.Group controlId="currentPassword" className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" />
                      </Form.Group>
                      <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" />
                      </Form.Group>
                      <Form.Group controlId="confirmPassword" className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" />
                      </Form.Group>
                      <Button type="submit" className="w-100">
                        Change Password
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
                </Card.Body>
              </Tab.Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
