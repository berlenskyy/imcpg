import React from 'react'
import {useState}from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Hero from '../Components/Hero/Hero.jsx'
import Programs from '../Components/Programs/Programs.jsx'
import Title from '../Title/Title.jsx'
import About from '../Components/About/About.jsx'
import Campus from '../Components/Campus/Campus.jsx'
import Testimonials from '../Components/Testimonials/Testimonials.jsx'
import Contact from '../Components/Contact/Contact.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer.jsx'
import ReleveController from '../Components/Releve/ReleveController.jsx'

const Home = () => {
  const [playState, setPlayState] = useState(false);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title title='Ce Que Nous Offrons' subtitle='Notre Programme'/>
        <Programs/>
        <About setPlayState={setPlayState}/>
        <Title title='Photos Du Campus' subtitle='Galerie'/>
        <Campus/>
        <Title title='Ce que disent nos élèves' subtitle='Témoignages'/>
        <Testimonials/>
        <Title title='Get In Touch' subtitle='Contactez-Nous'/>
        <Contact/>
       
        <VideoPlayer playState={playState} setPlayState={setPlayState}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home