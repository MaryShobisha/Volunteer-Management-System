import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProjectListing.css";

function ProjectListing(params = {userData,mine}) {
  const { category } = useParams();
  const navigate = useNavigate();
  console.log(params)
  // const projectsData = {
  //   Environment: {
  //     title: "Environment Projects",
  //     projects: [
  //       {
  //         id: "urban-tree-planting",
  //         title: "Urban Tree Planting",
  //         description:
  //           "Help restore green spaces in urban areas by planting native trees in city parks.",
  //         location: "Riverside Park, Downtown",
  //         dateTime: "Every Saturday, 9.00 AM - 1.00 PM",
  //         duration: "3 months (June - August 2025)",
  //         skills: "No special skills required, training provided",
  //         fullDescription:
  //           "Join our Urban Tree Planting initiative to help increase the tree canopy in our city. Volunteers will work alongside certified arborists to plant native tree species in designated areas of Riverside Park. This project aims to combat urban heat islands, improve air quality, and create habitats for local wildlife.",
  //       },
  //       {
  //         id: "beach-cleanup",
  //         title: "Beach Cleanup",
  //         description:
  //           "Join our weekend initiative to clean plastic waste from local beaches and protect marine life.",
  //         location: "Sunny Shores Beach",
  //         dateTime: "Every Sunday, 8.00 AM - 12.00 PM",
  //         duration: "Ongoing",
  //         skills: "No special skills required",
  //         fullDescription:
  //           "Our beach cleanup initiative focuses on removing plastic waste and debris from local shores to protect marine ecosystems. Volunteers will be provided with gloves, trash bags, and basic training on safe waste collection. This ongoing project welcomes participants of all ages and abilities.",
  //       },
  //       {
  //         id: "environmental-workshop",
  //         title: "Environmental Workshop",
  //         description:
  //           "Lead workshops teaching children about sustainability and environmental protection.",
  //         location: "Various Community Centers",
  //         dateTime: "Weekday afternoons, 4.00 PM - 6.00 PM",
  //         duration: "6 weeks (July - August 2025)",
  //         skills:
  //           "Teaching experience preferred, environmental knowledge helpful",
  //         fullDescription:
  //           "Our environmental workshops aim to inspire the next generation of environmentalists. Volunteers will help design and lead interactive sessions for children ages 8-12, covering topics such as recycling, conservation, and sustainability. Training and materials will be provided.",
  //       },
  //       {
  //         id: "bird-habitat-monitoring",
  //         title: "Bird Habitat Monitoring",
  //         description:
  //           "Monitor and document bird species in protected areas to support conservation efforts.",
  //         location: "Willow Creek Nature Reserve",
  //         dateTime: "Fridays, 6.00 AM - 10.00 AM",
  //         duration: "4 months (May - August 2025)",
  //         skills:
  //           "Basic bird identification skills preferred, training provided",
  //         fullDescription:
  //           "This citizen science project involves monitoring bird populations in our local nature reserve. Volunteers will learn to identify common species, record observations, and contribute valuable data to conservation research. Equipment and training will be provided.",
  //       },
  //       {
  //         id: "community-garden",
  //         title: "Community Garden",
  //         description:
  //           "Help maintain and expand a community garden that provides fresh produce to local food banks.",
  //         location: "Oakridge Community Center",
  //         dateTime: "Tuesdays & Thursdays, 9.00 AM - 12.00 PM",
  //         duration: "Growing season (April - October 2025)",
  //         skills: "Basic gardening knowledge helpful but not required",
  //         fullDescription:
  //           "Our community garden project grows fresh vegetables for local food banks while creating green space in urban neighborhoods. Volunteers will assist with planting, weeding, watering, and harvesting. This project welcomes gardeners of all experience levels.",
  //       },
  //       {
  //         id: "waste-reduction-campaign",
  //         title: "Waste Reduction Campaign",
  //         description:
  //           "Organize and participate in a city-wide campaign to promote proper recycling practices.",
  //         location: "Various locations throughout the city",
  //         dateTime: "Flexible schedule",
  //         duration: "3 months (June - August 2025)",
  //         skills: "Communication skills, enthusiasm for sustainability",
  //         fullDescription:
  //           "Our waste reduction campaign aims to improve recycling rates and reduce contamination in the waste stream. Volunteers will engage with community members at events, distribute educational materials, and help organize workshops. This project requires good communication skills and passion for environmental issues.",
  //       },
  //     ],
  //   },
  //   Education: {
  //     title: "Education Projects",
  //     projects: [
  //       {
  //         id: "afterschool-tutoring",
  //         title: "Afterschool Tutoring",
  //         description:
  //           "Help students with homework and study skills after school hours.",
  //         location: "Jefferson Elementary School",
  //         dateTime: "Monday-Thursday, 3.00 PM - 5.00 PM",
  //         duration: "School year (September 2025 - June 2026)",
  //         skills: "Subject knowledge, patience with children",
  //         fullDescription:
  //           "Our afterschool tutoring program supports students who need additional academic help. Volunteers work one-on-one or in small groups to assist with homework, reinforce concepts, and build study skills. This is a rewarding opportunity to make a direct impact on student success.",
  //       },
  //       {
  //         id: "literacy-program",
  //         title: "Literacy Program",
  //         description:
  //           "Support adult literacy programs by providing one-on-one reading assistance.",
  //         location: "Downtown Public Library",
  //         dateTime: "Evenings and weekends, flexible schedule",
  //         duration: "Minimum 6-month commitment",
  //         skills: "Strong reading skills, patience, cultural sensitivity",
  //         fullDescription:
  //           "Our adult literacy program pairs volunteers with adults working to improve their reading skills. Tutors provide support, encouragement, and structured practice in a respectful environment. This program requires sensitivity and commitment to supporting adult learners.",
  //       },
  //       {
  //         id: "stem-workshops",
  //         title: "STEM Workshops",
  //         description:
  //           "Lead engaging workshops that introduce students to science, technology, engineering, and math concepts.",
  //         location: "Various middle schools",
  //         dateTime: "Friday afternoons, 2.00 PM - 4.00 PM",
  //         duration: "School year (September 2025 - June 2026)",
  //         skills: "Background in STEM field preferred, enthusiasm for teaching",
  //         fullDescription:
  //           "Our STEM workshop series introduces middle school students to exciting aspects of science, technology, engineering, and math through hands-on activities. Volunteers help design and lead interactive sessions that spark curiosity and build confidence in STEM subjects.",
  //       },
  //     ],
  //   },
  //   Healthcare: {
  //     title: "Healthcare Projects",
  //     projects: [
  //       {
  //         id: "elderly-companionship",
  //         title: "Elderly Companionship",
  //         description:
  //           "Visit and provide companionship to elderly individuals in care facilities.",
  //         location: "Sunshine Senior Living",
  //         dateTime: "Flexible schedule, minimum 2 hours per week",
  //         duration: "Ongoing, minimum 3-month commitment",
  //         skills: "Empathy, good listening skills, reliability",
  //         fullDescription:
  //           "Our elderly companionship program aims to reduce isolation and loneliness among seniors. Volunteers visit residents at local care facilities to engage in conversation, play games, assist with activities, or simply provide a friendly presence. This opportunity requires compassion and reliability.",
  //       },
  //       {
  //         id: "health-screening",
  //         title: "Health Screening Support",
  //         description:
  //           "Assist healthcare professionals with community health screening events.",
  //         location: "Various community centers",
  //         dateTime: "One Saturday per month, 9.00 AM - 2.00 PM",
  //         duration: "Ongoing",
  //         skills:
  //           "Healthcare background helpful but not required, good organization skills",
  //         fullDescription:
  //           "Our community health screening events provide free basic health checks to underserved populations. Volunteers help with registration, basic measurements, and event logistics. This is an excellent opportunity for those interested in healthcare careers or public health.",
  //       },
  //       {
  //         id: "wellness-education",
  //         title: "Wellness Education",
  //         description:
  //           "Conduct workshops on nutrition, exercise, and mental health in underserved communities.",
  //         location: "Community centers in various neighborhoods",
  //         dateTime: "Weekday evenings, 6.00 PM - 8.00 PM",
  //         duration: "8 weeks (rotating schedule)",
  //         skills: "Knowledge of health and wellness topics, teaching ability",
  //         fullDescription:
  //           "Our wellness education program brings important health information to communities that may have limited access to resources. Volunteers help prepare and present workshops on topics such as nutrition, exercise, stress management, and preventive care. Training materials are provided.",
  //       },
  //     ],
  //   },
  // };

  // Get the data for the selected category
  const [projectsData, setProjectsData] = useState([])
  const [appliedProjectsData, setAppliedProjectsData] = useState([])
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)
  
  useEffect(() => {
      // Simulate fetching data from an API or database
      const fetchProjects = async () => {
        try {
          // Replace with real fetch logic
          const response = await fetch(`http://localhost:3200/api/categories/${category}/projects`); 
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          data.map((project) => project.category==category?setProjectsData():"")
          let appliedProjects = params.userData.appliedProjects
          if(Object.keys(appliedProjects).length !==0){
          const userAppliedProjects = data.filter(obj1 =>
                appliedProjects.some(obj2 => obj1._id === obj2.projectId)
          );
          const newdata = data.filter(obj1 =>
                !appliedProjects.some(obj2 => obj1._id === obj2.projectId)
          );
          setAppliedProjectsData(userAppliedProjects)
          setProjectsData(newdata)
        }
        else{
          setProjectsData(data)
        }
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

  const categoryData = projectsData[category] || {
    title: "Projects",
    projects: [],
  };

  const handleDetailsClick = (project,appliedstatus=false) => {
    navigate(`/projects/${category}/${project._id}`, { state: { project,appliedstatus } });
  };

  console.log(appliedProjectsData,projectsData)
  return (
    <Container className="py-4">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav mb-3">
        <Link to="/">Dashboard</Link> &gt; {categoryData.title}
      </div>

      <h1 className="category-title mb-4">{categoryData.title}</h1>
      
      {((!params.mine && appliedProjectsData.length==0 )||(appliedProjectsData.length>0 || projectsData.length>0))&&<h2 className="available-projects-heading mb-4">Projects</h2>}
{params.mine && appliedProjectsData.length==0 && <>
        <p className="available-projects-heading mb-2 text-danger">No project applied</p>
        </>}
      <Row className="gx-4 gy-4">
        {appliedProjectsData  && appliedProjectsData.map((project, index) => (
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
        ))}
        
        
        {params.userType === 'volunteer' && !params.mine && projectsData && projectsData.map((project, index) => (
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
                    variant="primary"
                    className="apply-btn me-2"
                    onClick={() => handleDetailsClick(project,false)}
                  >
                    Apply
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {params.userType === 'admin' &&!params.mine && projectsData && projectsData.map((project, index) => (
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
        ))}
      </Row>

      {categoryData.projects.length > 6 && (
        <div className="text-center mt-5">
          <Button variant="outline-primary" className="view-more-btn">
            View More Projects
          </Button>
        </div>
      )}
    </Container>
  );
}

export default ProjectListing;
