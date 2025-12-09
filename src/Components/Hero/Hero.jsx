import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/icons8-right-arrow-50.png'
const Hero = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
          <h1>Nous offrons une meilleure éducation pour un avenir meilleur</h1>
          <p>Notre approche pédagogique moderne vise à offrir aux enfants les 
            connaissances, les compétences et les valeurs dont ils ont besoin 
            pour grandir, apprendre et réussir dans un monde en constante évolution.
          </p>
          <button className='btn'>Decouvrir plus <img src={dark_arrow} alt="" /></button>
        </div>
    </div>
  )
}

export default Hero