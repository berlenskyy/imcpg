import React from 'react'
import './About.css';
import about_img from '../../assets/about_img.png';
import play_icon from '../../assets/play_icon.png';


const About = ({setPlayState}) => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={about_img} alt="" className='about-img'/>
            <img src={play_icon} alt="" className='play_icon' onClick={()=>{ setPlayState(true)}}/>
        </div>
        <div className="about-right">
            <h3>À Propos De L’IMCPG</h3>
            <h2>Former Les Citoyens Responsables De Demain, Dès Aujourd’hui</h2>
            <p>
                Rejoignez une communauté scolaire engagée où chaque enfant est 
                accompagné dans son développement intellectuel, social et moral.
                Notre programme éducatif, soigneusement conçu, aide les élèves 
                à progresser étape par étape, du préscolaire jusqu'au secondaire.
            </p>
            <p>
                Nous mettons l’accent sur :
                <ul>
                    <li>L’innovation pédagogique</li>
                    <li>L’apprentissage actif et pratique</li>
                    <li>Un accompagnement personnalisé</li>
                    <li>Un environnement sain et sécurisé</li>
                </ul>

                Nous guidons les élèves pour qu’ils deviennent curieux, confiants, 
                autonomes et prêts à relever les défis futurs – que ce soit en 
                classe, dans la société ou dans leur vie personnelle.
            </p>
            <p>
                Que votre enfant commence en maternelle, en primaire ou en secondaire, 
                notre école propose un parcours complet qui favorise la réussite, le 
                caractère, et le développement d’un véritable potentiel personnel.
                
            </p>
        </div>
    </div>
  )
}

export default About