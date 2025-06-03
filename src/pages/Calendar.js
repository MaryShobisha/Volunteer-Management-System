import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const  [volunteerProjects,setVolunteerProjects] = useState([])
  // const volunteerProjects = [
  //   {
  //     id: 1,
  //     title: "Beach Cleanup Drive",
  //     date: new Date(2025, 4, 10), // May 10, 2025
  //     category: "environment",
  //     description: "Help clean the local beach and protect marine wildlife",
  //     location: "Sunset Beach",
  //     slots: 15,
  //     participants: 8,
  //   },
  //   {
  //     id: 2,
  //     title: "Literacy Workshop",
  //     date: new Date(2025, 4, 15), // May 15, 2025
  //     category: "education",
  //     description:
  //       "Volunteer to teach basic reading skills to underprivileged children",
  //     location: "Community Center",
  //     slots: 10,
  //     participants: 5,
  //   },
  //   {
  //     id: 3,
  //     title: "Senior Care Visit",
  //     date: new Date(2025, 4, 12), // May 12, 2025
  //     category: "healthcare",
  //     description: "Spend time with elderly residents at the nursing home",
  //     location: "Sunshine Elderly Home",
  //     slots: 12,
  //     participants: 6,
  //   },
  //   {
  //     id: 4,
  //     title: "Park Restoration",
  //     date: new Date(2025, 4, 20), // May 20, 2025
  //     category: "environment",
  //     description: "Planting trees and restoring pathways in the city park",
  //     location: "Central Park",
  //     slots: 20,
  //     participants: 12,
  //   },
  //   {
  //     id: 5,
  //     title: "Children's Hospital Visit",
  //     date: new Date(2025, 4, 18), // May 18, 2025
  //     category: "healthcare",
  //     description: "Bring joy to children with games and activities",
  //     location: "Hope Children's Hospital",
  //     slots: 8,
  //     participants: 4,
  //   },
  //   {
  //     id: 6,
  //     title: "STEM Workshop for Girls",
  //     date: new Date(2025, 4, 25), // May 25, 2025
  //     category: "education",
  //     description:
  //       "Inspire young girls to pursue careers in science and technology",
  //     location: "Public Library",
  //     slots: 15,
  //     participants: 10,
  //   },
  // ];


  useEffect(() => {
        const fetchProjectsCategoryforCalender = async () => {
          try {
            const jwtToken = localStorage.getItem('jwtToken');;
            const response = await fetch("http://localhost:3200/api/users/profile/applications/projectsdetail", {
              method: 'GET',
  headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',   
        }
  })

            
            
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            console.log(data)
            
            setVolunteerProjects(data)
          } catch (err) {
            console.error(err);
            // setError('Could not load projects.');
          } finally {
            // setLoading(false);
          }
        };
    
        fetchProjectsCategoryforCalender();
      }, []);
  const filteredProjects =
    filter === "all"
      ? volunteerProjects
      : volunteerProjects.filter((project) => project.category === filter);

  // const hasProject = (date) => {
  //   return filteredProjects.some(
  //     (project) =>
  //       project.date.getDate() === date.getDate() &&
  //       project.date.getMonth() === date.getMonth() &&
  //       project.date.getFullYear() === date.getFullYear()
  //   );
  // };
  const hasProject = (date) => {
  return filteredProjects.some((project) => {
    const projectDate = new Date(project.date);
    return (
      projectDate.getDate() === date.getDate() &&
      projectDate.getMonth() === date.getMonth() &&
      projectDate.getFullYear() === date.getFullYear()
    );
  });
};


  // const getProjectsForDate = (date) => {
  //   return filteredProjects.filter(
  //     (project) =>
  //       project.date.getDate() === date.getDate() &&
  //       project.date.getMonth() === date.getMonth() &&
  //       project.date.getFullYear() === date.getFullYear()
  //   );
  // };

  const getProjectsForDate = (date) => {
  return filteredProjects.filter((project) => {
    const projectDate = new Date(project.date);
    return (
      projectDate.getDate() === date.getDate() &&
      projectDate.getMonth() === date.getMonth() &&
      projectDate.getFullYear() === date.getFullYear()
    );
  });
};

  const tileContent = ({ date, view }) => {
    if (view === "month" && hasProject(date)) {
      const projects = getProjectsForDate(date);
      // Get unique categories for this date
      const categories = [
        ...new Set(projects.map((project) => project.category)),
      ];

      return (
        <div className="project-indicator-container">
          {categories.map((category) => (
            <div
              key={category}
              className={`project-indicator ${category}`}
              title={`${
                category.charAt(0).toUpperCase() + category.slice(1)
              } project`}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && hasProject(date)) {
      const projects = getProjectsForDate(date);
      const categories = projects.map((project) => project.category);
      let classes = "has-project";

      if (categories.includes("environment")) classes += " has-environment";
      if (categories.includes("education")) classes += " has-education";
      if (categories.includes("healthcare")) classes += " has-healthcare";

      return classes;
    }
    return null;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "environment":
        return "success";
      case "education":
        return "info";
      case "healthcare":
        return "danger";
      default:
        return "primary";
    }
  };

  const formatSelectedDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Container className="calendar-container">
      <h1 className="calendar-title">Volunteer Opportunities Calendar</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>
              <strong>Filter by Category</strong>
            </Form.Label>
            <Form.Select
              value={filter}
              onChange={handleFilterChange}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={8} className="category-legend">
          <div className="legend-title">
            <strong>Legend:</strong>
          </div>
          <div className="legend-item">
            <div className="legend-color environment" />
            <span>Environment</span>
          </div>
          <div className="legend-item">
            <div className="legend-color education" />
            <span>Education</span>
          </div>
          <div className="legend-item">
            <div className="legend-color healthcare" />
            <span>Healthcare</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={7}>
          <Card className="calendar-card">
            <Card.Body>
              <ReactCalendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                tileClassName={tileClassName}
                className="custom-calendar"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="events-card">
            <Card.Body>
              <h3 className="selected-date">{formatSelectedDate(date)}</h3>

              {getProjectsForDate(date).length > 0 ? (
                <div className="events-list">
                  {getProjectsForDate(date).map((project) => (
                    <Card key={project.id} className="event-item mb-3">
                      <Card.Body>
                        <Badge
                          bg={getCategoryColor(project.category)}
                          className="category-badge"
                        >
                          {project.category.charAt(0).toUpperCase() +
                            project.category.slice(1)}
                        </Badge>
                        <h4 className="event-title">{project.title}</h4>
                        <p className="event-description">
                          {project.description}
                        </p>
                        <div className="event-details">
                          <div className="event-detail">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span>{project.location}</span>
                          </div>
                          <div className="event-detail">
                            <i className="bi bi-people-fill"></i>
                            <span>
                              {project.participants} / {project.slots}{" "}
                              volunteers
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="no-events">
                  <p>No volunteer opportunities scheduled for this date.</p>
                  <p className="text-muted">
                    Select a different date or check back later for updates.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Calendar;
