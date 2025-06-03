import CategorySection from "../components/Dashboard/CategorySection";
import { Container } from "react-bootstrap";
import { getUserFromToken } from "../utils/auth";
import { useEffect,useState } from "react";

const MyProjects = () => {
  const [userId, setUserId] = useState()
  useEffect(() => {
    const user = getUserFromToken()
    setUserId(user.userId)
  },[])
  return (
    <Container
      className="dashboard-container"
      style={{ scrollbarWidth: "none" }}
    >
      <CategorySection user={userId} mine={true}/>
    </Container>
  );
};

export default MyProjects;
