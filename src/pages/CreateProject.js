import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    location: "",
    weekday: "",
  startTime: "09:00",
  hours: 1,
  weeks: "",
  months: 1,
  monthFrom: new Date().toISOString().slice(0,7),
  monthTo: "",
    fulldescription: "",
    skillsInput: "",
    skillsRequired: [],
  });
  const [category,setCategory] = useState("")
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategory = (e) => {
    const {value} = e.target;
   setCategory(value);
   
  }

  const handleSkillsChange = (e) => {
    const input = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      skillsInput: input,
      skillsRequired: input
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      projectName: formData.projectName,
      description: formData.description,
      location: formData.location,
      dateTime: `Every ${formData.weekday}, ${formData.startTime} - ${formData.startTime + formData.hours}`,
      duration: `${formData.months || 0} months (${formData.monthFrom} - ${formData.monthFrom + formData.months})`,
      fulldescription: formData.fulldescription,
      skillsRequired: formData.skillsRequired,
    };

    try {
      const response = await fetch(`http://localhost:3200/api/categories/${category}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          projectName: "",
          description: "",
          location: "",
          dateTime: "",
          duration: "",
          fulldescription: "",
          skillsInput: "",
          skillsRequired: [],
        });
        setValidated(false);
        alert("Project created successfully");
        navigate(-1); 
      } else {
        alert("Error creating project");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error");
    }
  };

  const handleCancel = () => {
    setFormData({
      projectName: "",
      description: "",
      location: "",
      dateTime: "",
      duration: "",
      fulldescription: "",
      skillsInput: "",
      skillsRequired: [],
    });
    setValidated(false);
  };

  return (
    <Container className="create-project-container">
      <Row>
        <Col lg={10} className="mx-auto">
          <Card className="create-project-card">
            <Card.Body>
              <h1 className="page-title">Create New Project</h1>

              {showSuccess && (
                <Alert
                  variant="success"
                  onClose={() => setShowSuccess(false)}
                  dismissible
                >
                  Project created successfully!
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row  className="scrollable">
              <Row >
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a project name.
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
  <Form.Label>Category</Form.Label>
  <Form.Select
    required
    name="category"
    value={category}
    onChange={handleCategory}
  >
    <option value="">-- Select Category --</option>
    <option value="Healthcare">Health</option>
    <option value="Education">Education</option>
    <option value="Environment">Environment</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    Please select a category.
  </Form.Control.Feedback>
</Form.Group>
</Col>
</Row>
                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={2}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a brief description"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a description.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="fulldescription"
                    value={formData.fulldescription}
                    onChange={handleChange}
                    placeholder="Enter full project details"
                  />
                </Form.Group>
<Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter project location"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">

  <Form.Label>Date & Time</Form.Label>
  <Row>
    <Col>
      <Form.Select
        name="weekday"
        value={formData.weekday}
        onChange={handleChange}
        required
      >
        <option value="">Select Day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </Form.Select>
    </Col>
    <Col>
    <InputGroup>
      <Form.Control
        type="number"
        name="hours"
        value={formData.hours}
        onChange={handleChange}
        placeholder="hours"
        min="0"
      />
      <InputGroup.Text>hours</InputGroup.Text>
      </InputGroup>
    </Col>
    <Col>
      <Form.Control
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
      step="3600"
      min={"09:00"}
        required
      />
    </Col>
    {/* <Col>
      <Form.Control
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
      step="3600"
        required
      />
    </Col> */}
  </Row>
</Form.Group>
</Col>
</Row>

                <Form.Group className="mb-3">
  <Form.Label>Duration</Form.Label>
  <Row>
    {/* <Col>
      <Form.Control
        type="month"
        name="weeks"
        value={formData.weeks}
        onChange={handleChange}
        placeholder="Weeks"
        min="0"
      />
    </Col> */}
    <Col>
    <InputGroup>
      <Form.Control
        type="number"
        name="months"
        value={formData.months}
        onChange={handleChange}
        placeholder="Months"
        min="0"
      />
      <InputGroup.Text>Months</InputGroup.Text>
      </InputGroup>
    </Col>
  {/* </Row>
  <Row className="mt-2"> */}
    <Col>
      <Form.Control
        type="month"
        name="monthFrom"
        value={formData.monthFrom}
        onChange={handleChange}
        min={new Date().toISOString().slice(0,7)} 
        placeholder="From (e.g. June 2025)"
      />
    </Col>
    {/* <Col>
      <Form.Control
        type="month"
        name="monthTo"
        value={formData.monthTo}
        onChange={handleChange}
        placeholder="To (e.g. August 2025)"
      />
    </Col> */}
  </Row>
</Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills Required</Form.Label>
                  <Form.Control
                    type="text"
                    name="skillsInput"
                    value={formData.skillsInput}
                    onChange={handleSkillsChange}
                    placeholder="Enter comma-separated skills (e.g. React, Python)"
                  />
                </Form.Group>
</Row>
                <div className="form-actions d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Project
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;
