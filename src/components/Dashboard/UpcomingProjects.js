import React from "react";
import { Button } from "react-bootstrap";
import "./UpcomingProjects.css";

function UpcomingProjects() {
  const upcomingProjects = [
    {
      title: "Beach Clean-up",
      date: "May 15, 2025 - 9:00 AM",
      location: "Galle Face Beach",
    },
    {
      title: "Food Bank Volunteer",
      date: "May 22, 2025 - 2:00 AM",
      location: "Caritas Sri Lanka",
    },
    {
      title: "Literacy Tutoring",
      date: "May 25, 2025 - 9:00 AM",
      location: "Public Library",
    },
  ];

  return (
    <div className="upcoming-projects-section">
      <h2>Upcoming Projects</h2>
      <div className="project-list">
        {upcomingProjects.map((project, index) => (
          <div key={index} className="project-item">
            <h5>{project.title}</h5>
            <p>
              {project.date} - {project.location}
            </p>
          </div>
        ))}
      </div>
      <Button variant="light" className="view-all-btn">
        View All Upcoming Projects
      </Button>
    </div>
  );
}

export default UpcomingProjects;
