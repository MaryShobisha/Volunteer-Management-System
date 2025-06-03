import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CategorySection.css";
import { getUserFromToken } from "../../utils/auth";

function CategorySection(user) {
  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiURL = `http://localhost:3200/api/categories/`
  
    useEffect(() => {
      const fetchProjectsCategory = async () => {
        try {
          const response = await fetch(apiURL);
          const userid = getUserFromToken();
          const jwtToken = localStorage.getItem('jwtToken');;
          const userProjectCategoriesResponse  = await fetch(`http://localhost:3200/api/users/profile`, {
            method: 'GET',
headers: {
        'Authorization': `Bearer ${jwtToken}`, 
        'Content-Type': 'application/json',   
      }
})
          const userProjectCategoriesData = await userProjectCategoriesResponse.json();
          const projects = userProjectCategoriesData.projects;
          
          
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          // console.log(data)
          
          setCategories(data);
        } catch (err) {
          console.error(err);
          setError('Could not load projects.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjectsCategory();
    }, []);
  
    const handleBrowse = (path) => {
      navigate(path);
    };

  return (
    <div className="category-section">
      <h2>Project Categories</h2>
      <Row className="gx-4 gy-4">
        {categories.map((category, index) => (
          <Col md={4} key={index}>
            <Card className="category-card border-0">
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="category-title mb-3">
                  {category.category}
                </Card.Title>
                <Card.Text className="category-description mb-4">
                  {category.description}
                </Card.Text>
                <div className="mt-auto text-center">
                  <Button
                    variant="primary"
                    className="browse-btn"
                    onClick={Object.keys(user).length == 0?() => handleBrowse("/projects/"+category.category):() => handleBrowse("/myprojects/"+category.category)}
                  >
                    Browse
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategorySection;
