import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./StatsSection.css";

function StatsSection({ userPoints }) {
  const stats = [
    {
      number: "12",
      title: "Projects completed",
      button: "View History",
      link: "/projects",
    },
    {
      number: userPoints.toString(), // Use the shared state value
      title: "Points earned",
      button: "Donate Points",
      link: "/loyalty-points", // Add link to loyalty points page
    },
    {
      number: "5",
      title: "Badges earned",
      button: "View All",
      link: "/badges",
    },
  ];

  return (
    <div className="stats-section">
      <h2>Your Stats</h2>
      <Row className="gx-4 gy-4">
        {stats.map((stat, index) => (
          <Col md={4} key={index}>
            <Card className="stats-card bg-light border-0">
              <Card.Body className="d-flex flex-column p-4">
                <h2 className="stats-number mb-1">{stat.number}</h2>
                <Card.Text className="stats-title mb-4">{stat.title}</Card.Text>
                <div className="mt-auto">
                  <Link to={stat.link}>
                    <Button variant="light" className="stats-btn">
                      {stat.button}
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StatsSection;
