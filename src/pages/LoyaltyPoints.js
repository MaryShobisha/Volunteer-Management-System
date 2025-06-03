import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import "./LoyaltyPoints.css";

function LoyaltyPoints({
  userPoints,
  setUserPoints,
  charities = defaultCharities,
}) {
  // States
  const [selectedCharity, setSelectedCharity] = useState("");
  const [pointsToSend, setPointsToSend] = useState("");
  const [message, setMessage] = useState("");
  const [donationSummary, setDonationSummary] = useState({
    charityName: "",
    donationAmount: 0,
    remainingBalance: userPoints,
  });
  const [donationComplete, setDonationComplete] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  // History states
  const [showHistory, setShowHistory] = useState(false);
  const [donationHistory, setDonationHistory] = useState([
    {
      id: 1,
      date: "2025-05-08",
      charity: "Ocean Cleanup Initiative",
      points: 250,
    },
    {
      id: 2,
      date: "2025-05-01",
      charity: "Books for All",
      points: 300,
    },
  ]);

  const handleCharitySelect = (charityId) => {
    setSelectedCharity(charityId);
    const charity = charities.find((c) => c.id === charityId);
    setDonationSummary({
      ...donationSummary,
      charityName: charity.name,
    });
  };

  const handlePointsChange = (e) => {
    const points = e.target.value;

    // Only allow numbers
    if (points === "" || /^\d+$/.test(points)) {
      setPointsToSend(points);

      if (points && !isNaN(points)) {
        const pointsValue = parseInt(points);
        setDonationSummary({
          ...donationSummary,
          donationAmount: pointsValue,
          remainingBalance: userPoints - pointsValue,
        });
      } else {
        setDonationSummary({
          ...donationSummary,
          donationAmount: 0,
          remainingBalance: userPoints,
        });
      }
    }
  };

  const handleDonation = () => {
    // Validation
    if (!selectedCharity) {
      alert("Please select a charity");
      return;
    }

    if (!pointsToSend || parseInt(pointsToSend) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    if (parseInt(pointsToSend) > userPoints) {
      alert("You don't have enough points for this donation");
      return;
    }

    // Simulate API call to backend
    setDonationComplete(true);

    // Simulate response from backend
    setTimeout(() => {
      // Update user points (using shared state setter)
      const newPoints = userPoints - parseInt(pointsToSend);
      setUserPoints(newPoints); // This will update in StatsSection as well

      // Add to donation history
      const donationDate = new Date().toISOString().split("T")[0];
      const newDonation = {
        id: donationHistory.length + 1,
        date: donationDate,
        charity: charities.find((c) => c.id === selectedCharity).name,
        points: parseInt(pointsToSend),
      };

      setDonationHistory([newDonation, ...donationHistory]);

      // Show success message
      setDonationSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setDonationComplete(false);
        setDonationSuccess(false);
        setSelectedCharity("");
        setPointsToSend("");
        setMessage("");
        setDonationSummary({
          charityName: "",
          donationAmount: 0,
          remainingBalance: newPoints,
        });
      }, 3000);
    }, 1500);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-2">Donate Your Points</h1>
      <p className="text-muted mb-4">
        Support charitable causes by donating your earned loyalty points
      </p>

      <div className="balance-card mb-5">
        <h5 className="balance-title">Your Points Balance</h5>
        <p className="balance-text">
          You currently have {userPoints} points available to donate
        </p>
        <Button
          variant="primary"
          className="history-btn"
          onClick={() => setShowHistory(true)}
        >
          View History
        </Button>
      </div>

      {donationSuccess && (
        <div className="alert alert-success mb-4">
          <strong>Thank you!</strong> Your donation of {pointsToSend} points to
          "{donationSummary.charityName}" has been processed successfully.
        </div>
      )}

      <h4 className="section-title mb-4">Select Charity</h4>
      <Row className="mb-5">
        {charities.map((charity) => (
          <Col md={4} key={charity.id} className="mb-3">
            <div
              className={`charity-card ${
                selectedCharity === charity.id ? "selected" : ""
              }`}
              onClick={() => handleCharitySelect(charity.id)}
            >
              <div className="charity-category">{charity.category}</div>
              <h5 className="charity-name">{charity.name}</h5>
              <p className="charity-description">{charity.description}</p>
              <div className="text-center">
                {selectedCharity === charity.id ? (
                  <div className="selected-indicator">Selected</div>
                ) : (
                  <Button variant="outline-primary" className="select-btn">
                    Select
                  </Button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <h4 className="section-title mb-4">Donation Details</h4>
      <div className="donation-details mb-5">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Selected Charity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Select a charity above"
              value={
                selectedCharity
                  ? charities.find((c) => c.id === selectedCharity)?.name
                  : ""
              }
              disabled
              className="form-field"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Points to Donate</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount of points"
              value={pointsToSend}
              onChange={handlePointsChange}
              className="form-field"
              min="1"
              max={userPoints}
            />
            <small className="text-muted">
              Maximum available: {userPoints} points
            </small>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Personal Message (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add a personal message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-field"
            />
          </Form.Group>
        </Form>
      </div>

      <h4 className="section-title mb-4">Donation Summary</h4>
      <div className="donation-summary mb-5">
        <p className="charity-name">
          {donationSummary.charityName || "No charity selected"}
        </p>
        <p className="donation-amount">
          {donationSummary.donationAmount > 0
            ? `${donationSummary.donationAmount} points`
            : "0 points"}
        </p>

        <p className="remaining-label">Remaining Balance After Donation</p>
        <p className="remaining-amount">
          {donationSummary.remainingBalance >= 0
            ? `${donationSummary.remainingBalance} points`
            : "Insufficient points"}
        </p>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          className="confirm-btn"
          onClick={handleDonation}
          disabled={
            donationComplete ||
            !selectedCharity ||
            !pointsToSend ||
            parseInt(pointsToSend) <= 0 ||
            parseInt(pointsToSend) > userPoints
          }
        >
          {donationComplete ? "Processing..." : "Confirm Donation"}
        </Button>
      </div>

      {/* Donation History Modal */}
      <Modal show={showHistory} onHide={() => setShowHistory(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Donation History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {donationHistory.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Charity</th>
                  <th>Points Donated</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.date}</td>
                    <td>{donation.charity}</td>
                    <td>{donation.points} points</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center py-4">No donation history available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistory(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const defaultCharities = [
  {
    id: "ocean",
    category: "Environmental",
    name: "Ocean Cleanup Initiative",
    description: "Help remove plastic waste from oceans worldwide",
  },
  {
    id: "books",
    category: "Education",
    name: "Books for All",
    description: "Provide educational materials to underserved communities",
  },
  {
    id: "medical",
    category: "Healthcare",
    name: "Medical Supplies Fund",
    description: "Deliver essential medical equipment to rural clinics",
  },
  {
    id: "hunger",
    category: "Humanitarian",
    name: "Global Hunger Relief",
    description:
      "Provide meals and sustainable food solutions to those in need",
  },
  {
    id: "wildlife",
    category: "Environmental",
    name: "Wildlife Protection Fund",
    description: "Conserve endangered species and their natural habitats",
  },
  {
    id: "digital",
    category: "Education",
    name: "Digital Literacy Project",
    description: "Bridge the digital divide by providing technology education",
  },
];

export default LoyaltyPoints;
