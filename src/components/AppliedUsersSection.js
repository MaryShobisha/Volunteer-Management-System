import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

function AppliedUsers() {
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
      profileImage: "/api/placeholder/50/50", 
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
      {/* Applied Users Section */}
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
      </div>}
    </Container>
  );
}

export default AppliedUsers;