 
import '../Colors.css'
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <div className='container'>
      <aside>
        <div className="top">
          <div className="logo">
            <img src="logo" alt="" />
            <h2>Admin-<span className='danger'>IMCPG</span></h2>
          </div>
          <div className="close" id='close-btn'>
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className="sidebar">
          <a href="#" className="active">
            <span className="material-icons-sharp">dashboard</span>
      </aside>
    </div>
  )
}

export default AdminDashboard