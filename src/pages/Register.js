"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("volunteer");
  const { project } = useParams();

  console.log(project)
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3200/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          dob,
          contactNumber,
          userType
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred while registering. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center my-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h1 className="text-center mb-4">Join Volunteer a</h1>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
                    <span className="visually-hidden">Registering...</span>
                  </Spinner>
                  <p className="mt-3 h5">Registering...</p>
                </div>
              ) : (
                <Form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                  <Form.Group controlId="fullName" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>

                  <Form.Group controlId="dob" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>

                  <Form.Group controlId="contactNumber" className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0777123745"
                      value={contactNumber}
                      pattern="07[0-9]{8}"
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>


                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-secondary bg-opacity-25"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
                    Register
                  </Button>
                </Form>
              )}

              {!loading && (
                <p className="text-center text-secondary small mt-4 mb-0">
                  Already have an account?{' '}
                  <a href="/login" className="fw-bold text-dark">Login here</a>
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
