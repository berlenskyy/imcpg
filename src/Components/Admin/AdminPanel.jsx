import "./AdminPanel.css"; 
import { Link as RouterLink } from "react-router-dom"; 
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"; 
import DashboardHome from "../DHome/Home.jsx"; 
import Sidebar from "./Sidebar.jsx";
const AdminPanel = ({ children = <DashboardHome/>}) => {
  
  return (
    <div className="admin-container">
      <Sidebar />
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
          <>
          {children}
          </>           
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
