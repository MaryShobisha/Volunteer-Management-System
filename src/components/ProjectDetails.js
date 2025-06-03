import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { category, projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const project = location.state?.project;
  const appliedstatus = location.state?.appliedstatus;
  console.log(location.state?.appliedstatus)
  // Mock database of users who already applied for this project
  const [appliedUsers, setAppliedUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      profileImage: "/api/placeholder/50/50", // Placeholder image
      applicationDate: "2025-04-28",
      status: "Approved",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      profileImage: "/api/placeholder/50/50",
      applicationDate: "2025-05-01",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      profileImage: "/api/placeholder/50/50", 
      applicationDate: "2025-05-03",
      status: "Pending",
    },
  ]);

    useEffect(() => {
    const token = localStorage.getItem("jwtToken");   
    if (!token) return;

    fetch("http://localhost:3200/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        const user = await res.json();
        console.log(user)
        setFormData({
          fullName:               user.fullName      || "",
          dateOfBirth:            user.dob?.slice(0,10) || "",   // ISO → yyyy-MM-dd
          contactNumber:          user.contactNumber || "",
          email:                  user.email         || "",
          address:                user.address       || "",
          emergencyContactName:   user.emergencyContactName || "",
          emergencyContactNumber: user.emergencyContactNumber || "",
        });
      })
      .catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    alert("Application submitted successfully!");
  };

  const handleNext = () => {
    if (
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.contactNumber ||
      !formData.email ||
      !formData.address ||
      !formData.emergencyContactName ||
      !formData.emergencyContactNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    navigate(`/projects/${category}/${projectId}/apply`, {
      state: {
        formData: formData,
        project: projectData,
      },
    });
  };

  const handleUserClick = (user) => {
    // Navigate to the messages component with the selected user data
    navigate("/new-message", {
      state: {
        recipient: user.name,
        recipientEmail: user.email,
        recipientImage: user.profileImage,
        projectTitle: projectData.title,
      },
    });
  };

  const defaultProject = {
    id: projectId,
    title: "Urban Tree Planting",
    description:
      "Help plant trees in urban areas to improve air quality and beautify neighborhoods.",
    location: "City Center Park",
    dateTime: "Saturday, May 15, 2025 at 9:00 AM",
    duration: "4 hours",
    skills: "No special skills required. Training will be provided.",
    fullDescription:
      "Join us for a day of urban greening! This project aims to plant 50 native trees in the City Center Park area to help combat urban heat islands, improve air quality, and create more beautiful community spaces. All tools and materials will be provided, and experts will be on hand to guide volunteers. Wear comfortable clothes and bring water. Lunch will be provided for all volunteers.",
  };

  const projectData = project || defaultProject;

  return (
    <Container className="py-4">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav mb-3">
        <Link to="/">Dashboard</Link> &gt;{" "}
        <Link to={`/projects/${category}`}>
          {category==""?category.charAt(0).toUpperCase() + category.slice(1):""} Projects
        </Link>{" "}
        &gt; {projectData.projectName}
      </div>

      <h1 className="mb-4">Project Details</h1>
      <h2 className="project-title mb-4">{projectData.title}</h2>

      <div className="project-info mb-5">
        <Row className="mb-3">
          <Col md={3}>
            <div className="info-label">Location</div>
          </Col>
          <Col md={9}>
            <div className="info-value">{projectData.location}</div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <div className="info-label">Date & Time</div>
          </Col>
          <Col md={9}>
            <div className="info-value">{projectData.dateTime}</div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <div className="info-label">Duration</div>
          </Col>
          <Col md={9}>
            <div className="info-value">{projectData.duration}</div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <div className="info-label">Skills Required</div>
          </Col>
          <Col md={9}>
            <div className="info-value">{projectData.skills}</div>
          </Col>
        </Row>
      </div>

      <div className="project-description mb-5">
        <h3 className="mb-3">Project Description</h3>
        <p>{projectData.fullDescription || projectData.description}</p>
      </div>

      {/* Applied Users Section
      {appliedstatus &&
      <div className="applied-users mb-5">
        <h3 className="mb-3">Applied Users</h3>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.applicationDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Approved" ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUserClick(user)}
                    >
                      Message
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>} */}

      {!appliedstatus && <div className="application-form mb-5">
      <h3 className="mb-4">Application Form</h3>
<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Full Name</Form.Label>
    <Form.Control
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.fullName !== null && formData.fullName !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Date of Birth</Form.Label>
    <Form.Control
      type="date"
      name="dateOfBirth"
      value={formData.dateOfBirth}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.dateOfBirth !== null && formData.dateOfBirth !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Contact Number</Form.Label>
    <Form.Control
      type="tel"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.contactNumber !== null && formData.contactNumber !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.email !== null && formData.email !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Address</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.address !== null && formData.address !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Emergency Contact Name</Form.Label>
    <Form.Control
      type="text"
      name="emergencyContactName"
      value={formData.emergencyContactName}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.emergencyContactName !== null && formData.emergencyContactName !== ""}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Emergency Contact Number</Form.Label>
    <Form.Control
      type="tel"
      name="emergencyContactNumber"
      value={formData.emergencyContactNumber}
      onChange={handleInputChange}
      required
      className="form-field"
      disabled={formData.emergencyContactNumber !== null && formData.emergencyContactNumber !== ""}
    />
  </Form.Group>

  <div className="text-end">
    <Button variant="primary" onClick={handleNext} className="next-btn">
      Next
    </Button>
  </div>
        </Form>
      </div>}
    </Container>
  );
}

export default ProjectDetails;
