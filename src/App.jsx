
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home.jsx'
import AdminPage from './Components/Admin/AdminPage.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Programs from './Components/Programs/Programs.jsx'
import About from './Components/About/About.jsx'
const App = () => {
  
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/accueil" element={<Home/>} />
        <Route path="/programme" element={<Programs/>} />
        <Route path="/apropos" element={<About/>} />
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path='/' */}
      </Routes>
    </>
    
  )
}

export default App