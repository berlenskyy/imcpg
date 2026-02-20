import React, { useState } from "react";
import "./AdminPanel.css";
import admin3 from "./../../assets/admin-32.png";
import { Link as RouterLink } from "react-router-dom";
import ReleveController from "./../Releve/ReleveController.jsx"; 
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BulletinCP from "../Releve/Bulletin.jsx";
import StudentsList from "../Students/ListStudents.jsx";
import DashboardHome from "../DHome/Home.jsx";
const AdminPanel = () => {
  const [body, setBody] = useState("DashboardHome");
  const handleClickWebsite = () => {
    setBody("NotReady"); 
  };
  const handleClickHome = () => {
    setBody("DashboardHome"); 
  };
  const handleClickReleve = () => {
    setBody("ReleveController");
  };
  const handleClickStudents = () => { 
    setBody("StudentsList");
  }
  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="top">
          <span>Portail IMCPG</span>
        </div>
        <hr />
        <div className="center">
          <ul>
            <li onClick={handleClickHome}>accueil</li>
            <li onClick={handleClickWebsite}>Direction</li>
            <li onClick={handleClickReleve}>Relevé(s)</li>
            <li onClick={handleClickStudents}>Élèves</li>
            <li onClick={handleClickWebsite}>Professeur</li>
            <li onClick={handleClickWebsite}>Parents</li>
            <li onClick={handleClickWebsite}>Matières</li>
            <li onClick={handleClickWebsite}>Classe</li>
            <li onClick={handleClickWebsite}>Leçon(s)</li>
            <li onClick={handleClickWebsite}>Devoir(s)</li>
            <li onClick={handleClickWebsite}>Exam(s)</li>
            <li onClick={handleClickWebsite}>Classe</li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="header">
          <div className="header-left">
            <div className="search">
              <input type="search" name="" id="" placeholder="rechercher" />
            </div>
          </div>
          <div className="header-right">
            <RouterLink to="/">
              <CloseOutlinedIcon className="close-icon" />
            </RouterLink>
          </div>
        </div>
        <div className="body">
          {
            (() => {
              switch (body) {
                case "DashboardHome":
                  return <DashboardHome/>
                case "ReleveController":
                  return <ReleveController />;
                case "BulletinCP":
                  return <BulletinCP />;
                case "StudentsList":
                  return <StudentsList />;
                case "NotReady":
                  return  <p className="defaultMessage">En Cours d'implementation . . .</p>;
                default:
                  return <DashboardHome/>;
              }
            })()
          }
          {/* {body === "ReleveController" ? (
            <BulletinCP />
          ) : (
            <p className="defaultMessage">En Cours d'implementation . . .</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
