// ApplicationForm.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import "./ApplicationForm.css";

function ApplicationForm() {
  const { category, projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get form data and project from location state if available
  const formData = location.state?.formData || {};
  const project = location.state?.project;

  const [applicationData, setApplicationData] = useState({
    projectInterest: "",
    skillsInterests: "",
    previousExperience: "",
    certificateFile: null,
    weekdayAvailability: "",
    weekendAvailability: "",
    category:category,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit!");
      return;
    }

    setApplicationData({
      ...applicationData,
      certificateFile: file,
      category:category,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const jwtToken = localStorage.getItem('jwtToken');;
            const userCount = await fetch(`http://localhost:3200/api/users/profile/applications/${projectId}`, {
              method: 'POST',
  headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',   
        },
        body:JSON.stringify(applicationData)
  })
  const projectCount = await fetch("http://localhost:3200/api/users/profile", {
              method: 'PUT',
  headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',   
        },
        body: JSON.stringify(formData)
  })        
            if (!userCount.ok) throw new Error('Failed to fetch counts');
            const userData = await userCount.json();
            if (!projectCount.ok) throw new Error('Failed to fetch counts');
            const projectData = await projectCount.json();
            // set(data)
          } catch (err) {
            console.error(err);
            // setError('Could not load projects.');
          }
    // Combine personal details from previous page with application details
    const completeApplication = {
      ...formData,
      ...applicationData,
    };
    console.log("Complete application submitted:", completeApplication);

    alert("Application submitted successfully!");

    navigate("/");
  };

  // If no project data in location state, use default or fetch based on ID
  const defaultProject = {
    id: projectId,
    title: "Urban Tree Planting",
    category: category,
  };

  const projectData = project || defaultProject;

  return (
    <Container className="py-4">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav mb-3">
        <Link to="/">Dashboard</Link> &gt;{" "}
        <Link to={`/projects/${category}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Projects
        </Link>{" "}
        &gt; {projectData.title}
      </div>

      <h2 className="mb-4">Application Form</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Why are you interested in this project?</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="projectInterest"
            value={applicationData.projectInterest}
            onChange={handleInputChange}
            required
            className="form-field"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Skills & Interests</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="skillsInterests"
            value={applicationData.skillsInterests}
            onChange={handleInputChange}
            required
            className="form-field"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Previous Experience</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="previousExperience"
            value={applicationData.previousExperience}
            onChange={handleInputChange}
            required
            className="form-field"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Upload Certificate</Form.Label>
          <div className="upload-container">
            <Form.Control
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="d-none"
              id="upload-certificate"
            />
            <div className="custom-file-upload">
              <label htmlFor="upload-certificate" className="upload-label">
                Upload Files
              </label>
            </div>
            {applicationData.certificateFile && (
              <span className="ms-3">
                {applicationData.certificateFile.name}
              </span>
            )}
          </div>
          <div className="text-muted small mt-2">
            Supported formats: PDF, JPG, PNG (Max 5MB)
          </div>
        </Form.Group>

        <div className="availability-section mb-4">
          <h4 className="mb-3">Availability</h4>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Weekdays</Form.Label>
              <div className="d-block text-muted small">Monday to Friday</div>
            </Col>
            <Col md={8}>
              <Form.Select
                name="weekdayAvailability"
                value={applicationData.weekdayAvailability}
                onChange={handleInputChange}
                required
                className="form-field"
              >
                <option value="">Select</option>
                <option value="mornings">Mornings</option>
                <option value="afternoons">Afternoons</option>
                <option value="evenings">Evenings</option>
                <option value="allDay">All day</option>
                <option value="notAvailable">Not available</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Label>Weekends</Form.Label>
              <div className="d-block text-muted small">
                Saturday and Sunday
              </div>
            </Col>
            <Col md={8}>
              <Form.Select
                name="weekendAvailability"
                value={applicationData.weekendAvailability}
                onChange={handleInputChange}
                required
                className="form-field"
              >
                <option value="">Select</option>
                <option value="mornings">Mornings</option>
                <option value="afternoons">Afternoons</option>
                <option value="evenings">Evenings</option>
                <option value="allDay">All day</option>
                <option value="notAvailable">Not available</option>
              </Form.Select>
            </Col>
          </Row>
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="submit-btn"
            size="lg"
          >
            Submit Application
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplicationForm;
