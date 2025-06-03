import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Badges.css";

// Simulated backend service to fetch badge data
const fetchBadges = (userId) => {
  // This would normally be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pointBadges: [
          {
            id: "bronze-donor",
            name: "Bronze Donor",
            description: "Donated 1,000 points to charities",
            threshold: 1000,
            icon: "🥉",
            category: "donation",
          },
          {
            id: "silver-donor",
            name: "Silver Donor",
            description: "Donated 2,500 points to charities",
            threshold: 2500,
            icon: "🥈",
            category: "donation",
          },
          {
            id: "gold-donor",
            name: "Gold Donor",
            description: "Donated 5,000 points to charities",
            threshold: 5000,
            icon: "🏅",
            category: "donation",
          },
          {
            id: "platinum-donor",
            name: "Platinum Donor",
            description: "Donated 10,000 points to charities",
            threshold: 10000,
            icon: "💎",
            category: "donation",
          },
        ],
        eventBadges: [
          {
            id: "first-event",
            name: "First Steps",
            description: "Participated in your first volunteer event",
            threshold: 1,
            icon: "👣",
            category: "participation",
          },
          {
            id: "regular-volunteer",
            name: "Regular Volunteer",
            description: "Participated in 5 volunteer events",
            threshold: 5,
            icon: "🌟",
            category: "participation",
          },
          {
            id: "dedicated-volunteer",
            name: "Dedicated Volunteer",
            description: "Participated in 10 volunteer events",
            threshold: 10,
            icon: "🏆",
            category: "participation",
          },
          {
            id: "community-hero",
            name: "Community Hero",
            description: "Participated in 20 volunteer events",
            threshold: 20,
            icon: "👑",
            category: "participation",
          },
        ],
        userStats: {
          points: 2450,
          eventsAttended: 7,
        },
      });
    }, 500);
  });
};

function Badges({ userPoints }) {
  const [loading, setLoading] = useState(true);
  const [badgeData, setBadgeData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from backend
    fetchBadges("user123").then((data) => {
      setBadgeData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Container className="badges-container py-5 text-center">
        <div className="loading-spinner">Loading badges...</div>
      </Container>
    );
  }

  // Use passed userPoints prop or fallback to fetched data
  const pointsToUse = userPoints || badgeData.userStats.points;
  const eventsAttended = badgeData.userStats.eventsAttended;

  // Calculate progress for each badge
  const calculateProgress = (current, threshold) => {
    return Math.min(100, Math.round((current / threshold) * 100));
  };

  // Mark badges as unlocked based on points and events
  const pointBadges = badgeData.pointBadges.map((badge) => ({
    ...badge,
    unlocked: pointsToUse >= badge.threshold,
  }));

  const eventBadges = badgeData.eventBadges.map((badge) => ({
    ...badge,
    unlocked: eventsAttended >= badge.threshold,
  }));

  // Calculate user's total badges
  const unlockedBadges = [...pointBadges, ...eventBadges].filter(
    (badge) => badge.unlocked
  ).length;

  return (
    <Container className="badges-container py-5">
      <div className="badges-header mb-4">
        <h1>Your Badges</h1>
        <p className="text-muted">
          You've earned {unlockedBadges} out of{" "}
          {pointBadges.length + eventBadges.length} badges
        </p>
      </div>

      <div className="badge-section mb-5">
        <h2>Points Badges</h2>
        <p className="text-muted">Current points: {pointsToUse}</p>
        <Row className="g-4">
          {pointBadges.map((badge) => (
            <Col md={6} lg={3} key={badge.id}>
              <Card
                className={`badge-card ${
                  badge.unlocked ? "unlocked" : "locked"
                }`}
              >
                <Card.Body className="text-center">
                  <div className="badge-icon mb-3">{badge.icon}</div>
                  <Card.Title>{badge.name}</Card.Title>
                  <Card.Text>{badge.description}</Card.Text>
                  <div className="progress badge-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${calculateProgress(
                          pointsToUse,
                          badge.threshold
                        )}%`,
                      }}
                      aria-valuenow={calculateProgress(
                        pointsToUse,
                        badge.threshold
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calculateProgress(pointsToUse, badge.threshold)}%
                    </div>
                  </div>
                  <div className="badge-threshold mt-2">
                    {pointsToUse}/{badge.threshold} points
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="badge-section">
        <h2>Event Badges</h2>
        <p className="text-muted">Events attended: {eventsAttended}</p>
        <Row className="g-4">
          {eventBadges.map((badge) => (
            <Col md={6} lg={3} key={badge.id}>
              <Card
                className={`badge-card ${
                  badge.unlocked ? "unlocked" : "locked"
                }`}
              >
                <Card.Body className="text-center">
                  <div className="badge-icon mb-3">{badge.icon}</div>
                  <Card.Title>{badge.name}</Card.Title>
                  <Card.Text>{badge.description}</Card.Text>
                  <div className="progress badge-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${calculateProgress(
                          eventsAttended,
                          badge.threshold
                        )}%`,
                      }}
                      aria-valuenow={calculateProgress(
                        eventsAttended,
                        badge.threshold
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calculateProgress(eventsAttended, badge.threshold)}%
                    </div>
                  </div>
                  <div className="badge-threshold mt-2">
                    {eventsAttended}/{badge.threshold} events
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Badges;
