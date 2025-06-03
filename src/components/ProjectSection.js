import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProjectListing.css";

function ProjectSection(params = {userData,mine}) {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([])
  const [appliedProjectsData, setAppliedProjectsData] = useState([])
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)
  

  
  useEffect(() => {
      // Simulate fetching data from an API or database
      const fetchProjects = async () => {
        try {
          // Replace with real fetch logic
          const response = await fetch(`http://localhost:3200/api/projects`); 
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          console.log(data)
          setProjectsData(data)
        //   let appliedProjects = params.userData.appliedProjects
        //   if(Object.keys(appliedProjects).length !==0){
        //   const userAppliedProjects = data.filter(obj1 =>
        //         appliedProjects.some(obj2 => obj1._id === obj2.projectId)
        //   );
        //   const newdata = data.filter(obj1 =>
        //         appliedProjects.some(obj2 => obj1._id !== obj2.projectId)
        //   );
        //   setAppliedProjectsData(userAppliedProjects)
        //   setProjectsData(newdata)
        // }
        // else{
        //   setProjectsData(data)
        // }
        } catch (err) {
          console.error(err);
          setError('Could not load projects.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
    
      const handleBrowse = (path) => {
        navigate(path);
      };

  const categoryData = projectsData

  const handleDetailsClick = (project,appliedstatus=false) => {
    navigate(`/all-projects/${project._id}`, { state: { project,appliedstatus } });
  };

  const handleCreateClick = () =>{
    navigate(`/create-project`);
  }
  return (
    <Container className="py-4">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav mb-3">
        <Link to="/">Admin Dashboard</Link> &gt; {"All Project"}
      </div>

      <h1 className="category-title mb-4">{"All Project"}</h1>
      
      <Row className="gx-4 gy-4">
        {projectsData  && projectsData.map((project, index) => (
          <Col md={4} key={index}>
            <Card className="project-card h-100 border-0">
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="project-title mb-3">
                  {project.projectName}
                </Card.Title>
                <Card.Text className="project-description mb-4">
                  {project.description}
                </Card.Text>
                <div className="mt-auto d-flex">
                  <Button
                    variant="outline-secondary"
                    className="details-btn"
                    onClick={() => handleDetailsClick(project,true)}
                  >
                    Details
                  </Button>
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
    <span className="fs-5 me-2">+</span> Create New Project
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

export default ProjectSection;
