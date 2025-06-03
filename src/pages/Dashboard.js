import React from "react";
import { Container } from "react-bootstrap";
import CategorySection from "../components/Dashboard/CategorySection";
import StatsSection from "../components/Dashboard/StatsSection";
import UpcomingProjects from "../components/Dashboard/UpcomingProjects";
import LeaderboardComponent from "../components/Dashboard/LeaderBoardSection";
import Calendar from "./Calendar";
import "./Dashboard.css";

function Dashboard({userName }) {
  return (
    <Container
      className="dashboard-container"
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="dashboard-welcome">Welcome Back, {userName}</h1>
      <LeaderboardComponent />
      <Calendar />
      <div id="projects"><CategorySection /></div>
      {/* <StatsSection userPoints={userPoints} /> */}
      {/* <UpcomingProjects /> */}
    </Container>
  );
}

export default Dashboard;
