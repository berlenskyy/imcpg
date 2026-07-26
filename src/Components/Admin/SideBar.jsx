import React from 'react'
import { Link } from 'react-router-dom'
const SideBar = () => {
  return (
    
    <div className="sidebar">
        <div className="top">
          <span>Portail IMCPG</span>
        </div>
        <hr />
        <div className="center">
          <ul>
            
            <Link to="/admin/"><li >accueil</li></Link>
            
            <Link to="/admin/direction"><li >Direction</li></Link>
            <Link to="/admin/releves"><li >Relevé(s)</li></Link>
            <Link to="/admin/students"><li >Élèves</li></Link>
            <Link to="/admin/teachers"><li >Professeur</li></Link>
            <Link to="/admin/parents"><li >Parents</li></Link>
            <Link to="/admin/courses"><li >Matières</li></Link>
            <Link to="/admin/classes"><li >Classe</li></Link>
            <Link to="/admin/lessons"><li >Leçon(s)</li></Link>
            <Link to="/admin/homeworks"><li >Devoir(s)</li></Link>
            <Link to="/admin/exams"><li >Exam(s)</li></Link>
            <Link to="/admin/classes"><li >Classe</li></Link>
          </ul>
        </div>
      </div>
  )
}

export default SideBar