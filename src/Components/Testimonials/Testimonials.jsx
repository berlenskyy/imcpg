import React from 'react'
import './Testimonials.css'
import { useRef } from 'react';
import next_icon from '../../assets/white_arrow.png'
import back_icon from '../../assets/white_left_arrow.png'
import user_1 from '../../assets/user-1.jpg'
import user_2 from '../../assets/user-2.jpg'
import user_3 from '../../assets/user-3.jpg'
import user_4 from '../../assets/user-4.jpg'


const Testimonials = () => {
    const slider = useRef();
    let tx = 0;
    const slideForward = () =>{
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%`
    
        
    }
    const slideBackward = () =>{
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%`
    
       
    }
    return (
    <div className='testimonials'>
        <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
        <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_1} alt="" />
                            <div>
                                <h3>Jimmmy Boyard</h3>
                                <span>IMCPG, Verretes</span>

                            </div>

                        </div>
                        <p> Le choix d'intier mon parcours scolaire au niveau Kindergarten 
                            a l'Institution Mixte Cerelus Pierre Glaude a ete l'une des  
                            meilleures decisions que je n'ai jamais prises. La communaute 
                            pgiste tres colaborative, oriente progres, determinant a 
                            l'excellence academique ont veritablement depasse mes attentes.
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_2} alt="" />
                            <div>
                                <h3>John Doe</h3>
                                <span>IMCPG, Verretes</span>
                            </div>
                        </div>
                        <p>Choisir de poursuivre ma maternelle à l’Institution Mixte Cérélus 
                            Pierre Glaude a été l’une des meilleures décisions de ma vie. La 
                            communauté chaleureuse, les installations modernes et l’engagement 
                            envers l’excellence académique ont véritablement dépassé mes attentes.
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_3} alt="" />
                            <div>
                                <h3>Abd Al </h3>
                                <span>IMCPG, Verretes</span>                            </div>                        </div>
                        <p>
                            Choisir de poursuivre ma maternelle à l’Institution Mixte Cérélus 
                            Pierre Glaude a été l’une des meilleures décisions de ma vie. La 
                            communauté chaleureuse, les installations modernes et l’engagement 
                            envers l’excellence académique ont véritablement dépassé mes attentes.
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_4} alt="" />
                            <div>
                                <h3>Gardi Karly</h3>
                                <span>IMCPG, Verretes</span>
                            </div>
                        </div>
                        <p>
                            Choisir de poursuivre ma maternelle à l’Institution Mixte Cérélus 
                            Pierre Glaude a été l’une des meilleures décisions de ma vie. La 
                            communauté chaleureuse, les installations modernes et l’engagement 
                            envers l’excellence académique ont véritablement dépassé mes attentes.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Testimonials