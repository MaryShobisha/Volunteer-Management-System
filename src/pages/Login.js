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

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async ()=> {
    setLoading(true);

    try {
        const response = await fetch("http://localhost:3200/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email, 
                password: password,
            }),
        });

        const data = await response.json();
        setLoading(false);
  
        if (response.ok) {
          if (data.token) {
            localStorage.setItem('jwtToken', data.token);
          }
          alert("Login successfully");
          window.location.href = "/";
        } else {
          alert(data.message || "Invalid credentials.");
        }
    } catch (error) {
        setLoading(false);
        alert("An error occurred while logging in. Please try again.");
        console.error("Login error:", error);
    }
};

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
    <Row className="w-100 justify-content-center">
      <Col xs={12} md={6} lg={4}>
        <Card className="shadow">
          <Card.Body>
            <h1 className="text-center mb-4">Login</h1>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3 h5">Loading...</p>
              </div>
            ) : (
              <Form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
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

                <div className="text-end mb-3">
                  <a href="/reset">
                    <font className="link-primary fw-bold">Forgot your password?</font>
                  </a>
                </div>

                <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
                  Login
                </Button>
              </Form>
            )}

            {!loading && (
              <p className="text-center text-secondary small mt-4 mb-0">
                Don't have an account?{' '}
                <a href="/register">
                  <font className="fw-bold text-dark">Register here</font>
                </a>
              </p>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
}
