import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CategorySection from "../components/Dashboard/CategorySection";
import StatsSection from "../components/Dashboard/StatsSection";
import UpcomingProjects from "../components/Dashboard/UpcomingProjects";
import "./AdminDashboard.css";
import LeaderboardComponent from "../components/Dashboard/LeaderBoardSection";

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalUsersCount, settotalUsersCount] = useState(0)
  const [totalProjectCount, settotalProjectCount] = useState(0)
  // Sample data - in a real app, you would fetch this from an API
  // const stats = {
  //   projects: 24,
  //   users: 156,
  // };
  useEffect(() => {
    const getTotalCount = async () => {
          try {
            const jwtToken = localStorage.getItem('jwtToken');;
            const userCount = await fetch("http://localhost:3200/api/users/admin/gettotalusercount", {
              method: 'GET',
  headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',   
        }
  })
  const projectCount = await fetch("http://localhost:3200/api/users/admin/gettotalprojectcount", {
              method: 'GET',
  headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',   
        }
  })        
            if (!userCount.ok) throw new Error('Failed to fetch counts');
            const userData = await userCount.json();
            if (!projectCount.ok) throw new Error('Failed to fetch counts');
            const projectData = await projectCount.json();
            console.log(userData[0].UserCount)
            console.log(projectData[0].UserCount)
            settotalProjectCount(projectData[0].UserCount)
            settotalUsersCount(userData[0].UserCount)
            // set(data)
          } catch (err) {
            console.error(err);
          } finally {
            // setLoading(false);
          }
        };
    
        getTotalCount();
      }, []);
  
  

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  return (
    <Container
      className="dashboard-container admin-dashboard"
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="dashboard-welcome">Admin Dashboard</h1>

      <Row className="admin-stats-row">
        <Col md={6} lg={3}>
         <Link to="../all-projects" style={{ textDecoration: 'none' }}>
          <Card className="admin-stat-card">
              <Card.Title>Total Projects</Card.Title>
              <div className="stat-number">{totalProjectCount}</div>
          </Card>
          </Link>
        </Col>
        <Col md={6} lg={3}>
        <Link to="../all-users" style={{ textDecoration: 'none' }}>
          <Card className="admin-stat-card">
            <Card.Title>Total Users</Card.Title>
            <div className="stat-number">{totalUsersCount}</div>
          </Card>
          </Link>
        </Col>
      
        <Col
          md={12}
          lg={6}
          className="d-flex align-items-center justify-content-end"
        >
          <Button
            variant="primary"
            size="lg"
            className="create-project-btn"
            onClick={handleCreateProject}
          >
            Create New Project
          </Button>
        </Col>
      </Row>

      <CategorySection />
      <LeaderboardComponent />
      {/* <UpcomingProjects /> */}
    </Container>
  );
}

export default AdminDashboard;
