import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProjectListing.css";

function UserSection(params = {userData,mine}) {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([])
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)
  

  
  useEffect(() => {
      // Simulate fetching data from an API or database
      const fetchProjects = async () => {
        try {
          const jwtToken = localStorage.getItem("jwtToken");
          const response = await fetch(`http://localhost:3200/api/users/admin/gettotalusers`, {
            method: 'GET',
headers: {
        'Authorization': `Bearer ${jwtToken}`, 
        'Content-Type': 'application/json',   
      }}); 
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          // console.log(data[0].Users)
          setUsersData(data[0].Users)
        } catch (err) {
          console.error(err);
          setError('Could not load projects.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
    

  const handleDetailsClick = (project,appliedstatus=false) => {
    navigate(`/all-users/${project._id}`, { state: { project,appliedstatus } });
  };

  const handleCreateClick = () =>{
    navigate(`/create-user`);
  }
  return (
    <Container className="py-4">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav mb-3">
        <Link to="/">Admin Dashboard</Link> &gt; {"All Project"}
      </div>

      <h1 className="category-title mb-4">{"All Project"}</h1>
      
      <Row className="gx-4 gy-4">
        {usersData  && usersData.map((user, index) => (
          <Col md={4} key={index}>
            <Card className="project-card h-100 border-0">
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="project-title mb-3">
                   
                </Card.Title>
                <Card.Text className="project-title mb-3">
                  <Row>
                    <Col>
                  <img
                  style={{ width: '100px', height: '100px' }}
                    src={user.profile??"/static/media/profile.6dc4b82c86e5a5178bfc.png"}
                    alt="Profile picture"
                    layout="fill"
                    className="rounded-circle object-cover"
                  /></Col>
                  <Col>
                  {user.fullName}</Col>
                  </Row>
                </Card.Text>
                <div className="mt-auto d-flex">
                  {/* <Button
                    variant="outline-secondary"
                    className="details-btn"
                    onClick={() => handleDetailsClick(user,true)}
                  >
                    Details
                  </Button> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}<div className="d-flex justify-content-end mb-3">
  <Button
    variant="primary"
    className="create-btn d-flex align-items-center"
    onClick={handleCreateClick}
  >
    <span className="fs-5 me-2">+</span> Create New User
  </Button>
</div>
        
        
              </Row>

      {/* {categoryData.projects.length > 6 && (
        <div className="text-center mt-5">
          <Button variant="outline-primary" className="view-more-btn">
            View More Projects
          </Button>
        </div>
      )} */}
    </Container>
  );
}

export default UserSection;
