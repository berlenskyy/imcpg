import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from './../../assets/logo.png'
import menu_icon from './../../assets/menu_icon.png'
import admin32 from './../../assets/admin-32.png'
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    })
  },[])

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = ()=>{
    mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }
  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <img src={logo} alt="" className='logo'/>
        <ul className={mobileMenu? '': 'hide-mobile-menu'}>
          <li><ScrollLink to='hero' smooth={true} offset={0} duration={500} >Accueil</ScrollLink></li>
          <li><ScrollLink to='programs' smooth={true} offset={-260} duration={500} >Programmes</ScrollLink></li>
          <li><ScrollLink to='about' smooth={true} offset={-150} duration={500} >A propos</ScrollLink></li>
          <li><ScrollLink to='campus' smooth={true} offset={-260} duration={500} >Campus</ScrollLink></li>
          <li><ScrollLink to='testimonials' smooth={true} offset={-260} duration={500} >Temoignages</ScrollLink></li>
          <li><ScrollLink to='contact' smooth={true} offset={-260} duration={500} className='btn'>Contactez-nous</ScrollLink></li>
          <li><RouterLink to='/admin' className='portail'><img src={admin32} alt="Portail Admin" /></RouterLink></li>
        </ul>
        <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar