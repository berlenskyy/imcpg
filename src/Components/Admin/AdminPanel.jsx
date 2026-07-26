import "./AdminPanel.css"; 
import { Outlet, Link as RouterLink } from "react-router-dom"; 
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"; 
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DashboardHome from "../DHome/Home.jsx"; 
import Sidebar from "./Sidebar.jsx";
import LogoutButton from "../LogoutBouton.jsx"
import { useAuth } from "../../hooks/useAuth";
const AdminPanel = () => {
  const { user } = useAuth();
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
            <div className="profile"> 
              <div>              
                  <AccountCircleRoundedIcon className="profile-icon" />
                  <span className="role">{user.role}</span>
              </div>

              
              <ul>
                 <li><LogoutButton/></li> 
              </ul>
            </div>
            
            <RouterLink to="/">
              <CloseOutlinedIcon className="close-icon" />
            </RouterLink>
          </div>
        </div>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
