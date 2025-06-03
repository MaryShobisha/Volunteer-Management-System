// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import MessageDetails from "./components/MessageDetails";
import NewMessage from "./components/NewMessage";
import LoyaltyPoints from "./pages/LoyaltyPoints";
import Badges from "./pages/Badges";
import ProjectListing from "./components/ProjectListing";
import ProjectDetails from "./components/ProjectDetails";
import ApplicationForm from "./components/ApplicationForm";
import Profile from "./pages/Profile"
import ProjectSection from "./components/ProjectSection";
import { isAuthenticated, getUserType } from './utils/auth';
import './App.css';
import profile from "./assets/profile.png";
import UserSection from "./components/UserSection";
import CreateUser from "./pages/Create-User";


function App() {
  const [userPoints, setUserPoints] = useState(2450);
  const [userName,setUserName] = useState("");
  const [userData, setUserData] = useState({
    currentUser: { name: "Alex Morgan", email: "alex.morgan@example.com", profileImage: "/api/placeholder/50/50"},
    appliedProjects: []
  });
  const [userType, setUserType] = useState(null);
  // console.log(userType)
  useEffect(() => {
    if (isAuthenticated()) {
      setUserType(getUserType());
    }
  }, []);

  useEffect(() => {
  getUserInformation()
  }, [])
  
  const getUserInformation = async () =>{
    const jwtToken = localStorage.getItem('jwtToken');
    if(!jwtToken){return}
        try {
          ;
          const response = await fetch(`http://localhost:3200/api/users/profile`, {
            method: 'GET',
headers: {
        'Authorization': `Bearer ${jwtToken}`, 
        'Content-Type': 'application/json',   
      }}); 
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          let userDetail = {
    currentUser: { name: data.fullName, email: data.email, profileImage: data.profileImage??profile, createdAt: data.createdAt,contactNumber: data.contactNumber??"",emergencyContactName: data.emergencyContactName??"",emergencyContactNumber: data.emergencyContactNumber??"",address:data.address??"",dob:data.dob??""},
    appliedProjects: data.projects
  }
        setUserName(data.fullName);
          setUserData(userDetail)
          // let projectData
          // data.map((project) => project.category==category?setProjectsData():"")
          // setProjectsData(data);
        } catch (err) {
          console.error(err);
          setError('Could not load projects.');
  }
  }
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  const PublicOnlyRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/" replace /> : children;
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated() && <Navigation userType={userType} />}
        <div className="content-container">
          <Routes>

            {/* Public routes */}
            <Route path="/login" element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } />
            <Route path="/register" element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            } />
            <Route path="/reset" element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            } />


            {userType !== 'admin' && userType !== 'volunteer' && (<Route path="/" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />)}
            {userType === 'admin' && (
              <>
                <Route path="/" element={<ProtectedRoute><AdminDashboard userPoints={userPoints} userName={userName}/></ProtectedRoute>} />  
                <Route path="/profile" element={<ProtectedRoute><Profile userData={userData}/></ProtectedRoute>} />           
                <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard userName={userName}/></ProtectedRoute>} />
                <Route path="/all-projects" element={<ProtectedRoute><ProjectSection /></ProtectedRoute>} />
                <Route path="/all-users" element={<ProtectedRoute><UserSection /></ProtectedRoute>} />
                <Route path="/create-user" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
                <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/projects/:category" element={<ProtectedRoute><ProjectListing userData={userData} mine={false} userType={userType}/></ProtectedRoute>} />
                <Route path="/all-projects/:projectId" element={<ProtectedRoute><ProjectDetails userData={userData} /></ProtectedRoute>} />
                <Route path="/projects/:category/:projectId" element={<ProtectedRoute><ProjectDetails userData={userData} /></ProtectedRoute>} />
              </>
            )}

            {userType === 'volunteer' && (
              <>
                <Route path="/" element={<ProtectedRoute><Dashboard userPoints={userPoints} userName={userName}/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile userData={userData}/></ProtectedRoute>} />
                <Route path="/myprojects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/messages/:id" element={<ProtectedRoute><MessageDetails /></ProtectedRoute>} />
                <Route path="/new-message" element={<ProtectedRoute><NewMessage /></ProtectedRoute>} />
                <Route path="/loyalty-points" element={<ProtectedRoute>
                  <LoyaltyPoints
                    userPoints={userPoints}
                    setUserPoints={setUserPoints}
                    charities={userData.appliedProjects}
                  />
                </ProtectedRoute>} />
                <Route path="/badges" element={<ProtectedRoute><Badges userPoints={userPoints} /></ProtectedRoute>} />
                <Route path="/myprojects/:category" element={<ProtectedRoute><ProjectListing userData={userData} mine={true} userType={userType}/></ProtectedRoute>} />
                <Route path="/projects/:category" element={<ProtectedRoute><ProjectListing userData={userData} mine={false} userType={userType}/></ProtectedRoute>} />
                <Route path="/projects/:category/:projectId" element={<ProtectedRoute><ProjectDetails userData={userData} /></ProtectedRoute>} />
                <Route path="/projects/:category/:projectId/apply" element={<ProtectedRoute>
                  <ApplicationForm userData={userData} setUserData={setUserData} />
                </ProtectedRoute>} />
              </>
            )}

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;