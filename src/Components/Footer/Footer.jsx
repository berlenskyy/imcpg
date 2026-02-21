import React from 'react'
import './Footer.css'
const Footer = () => {
 const year = new Date().getFullYear();

  return ( 
  
    <div className='footer'>
      <div className="colWrapper">
        <div className="col-1">
            <ul>
            <h3>Notre école</h3>
              <li>Portes ouvertes</li>
              <li>Projet éducatif</li>
              <li>Découvrir notre école</li>
              <li>Équipe-école</li>         
            </ul>
          </div>
          <div className="col-1">
            <h3>Services à l’élève</h3>
            <ul>
              <li>Espaces dédiés aux élèves</li>
              <li>Mesures d’aide</li>
              <li>Transport</li>
              <li>Portes ouvertes</li>
            </ul>
          </div>
          <div className="col-1">
            <h3>Programmes</h3>
            <ul>
              <li>Préscolaire</li>
              <li>Primaire</li>
              <li>Troisième Cycle</li>
              <li>Secondaire</li>
            </ul>
          </div>
           <div className="col-1">
            <h3>Administration</h3>
            <ul>
              <li>FAQ</li>
              <li>Portail</li>
              <li>Nous Joindres</li>
              <li>Privacy Policy</li>
              <li>Terms of service</li>
            </ul>
          </div>
        </div>

      <p>&copy; {year} IMCPG - Tous droits réservés.</p>
      
    </div>
  )
}

export default Footer