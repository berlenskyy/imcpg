import React from 'react'
import './Footer.css'
const Footer = () => {
 const year = new Date().getFullYear();

  return ( 
  
    <div className='footer'>
        <p>&copy; {year} IMCPG - Tous droits réservés.</p>
        <ul>
            <li>Terms of service</li>
            <li>Privacy Policy</li>
        </ul>
    </div>
  )
}

export default Footer