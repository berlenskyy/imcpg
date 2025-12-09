import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero.jsx'
import Programs from './Components/Programs/Programs.jsx'
import Title from './Title/Title.jsx'
import About from './Components/About/About.jsx'
import Campus from './Components/Campus/Campus.jsx'
import Testimonials from './Components/Testimonials/Testimonials.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Footer from './Components/Footer/Footer.jsx'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title title='Ce Que Nous Offrons' subtitle='Notre Programme'/>
        <Programs/>
        <About/>
        <Title title='Photos Du Campus' subtitle='Galerie'/>
        <Campus/>
        <Title title='Ce que disent nos élèves' subtitle='Témoignages'/>
        <Testimonials/>
        <Title title='Get In Touch' subtitle='Contactez-Nous'/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  )
}

export default App