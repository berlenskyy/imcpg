import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white_arrow.png'
import MessageIcon from '@mui/icons-material/Message'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("En cours d'envoi....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6236e5a8-ab2d-413d-b10e-c21328f87ebc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Formulaire Soumise Avec Succes !");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className='contact'>
       <div className="contact-col">
            <h3><span>Envoyez-nous un message </span><MessageIcon /> </h3>
            <p>
                N’hésitez pas à nous écrire via le formulaire de contact ou 
                à consulter nos coordonnées ci-dessous. Vos retours, questions 
                et suggestions sont importants pour nous, car ils nous aident 
                à offrir un service exceptionnel à notre communauté scolaire.
            </p>
            <ul>
                <li> <EmailIcon /> imcpg.edu@gmail.com</li>
                <li> <PhoneIcon /> +509 44 24 00 39</li>
                <li> <LocationOnIcon /> 118, Boulevard Jean Jacques Dessalines, Verrettes, Haiti</li>
            </ul>
        </div> 
       <div className="contact-col">
            <form onSubmit={onSubmit}>
              <label >Votre Nom</label>
              <input type="text" name='name' placeholder='Saisir votre nom' required/>
              <label >Numero de Telephone </label>
              <input type="tel" name='phone' placeholder='Saisir votre num de telephone' required/>      
              <label >Saisir votre commentaire ici</label>
              <textarea name="message" rows="6" placeholder='Saisir votre message' required></textarea>
              <button type="submit" className='btn dark-btn'>Envoyer <img src={white_arrow} alt="" /></button>
            </form>
            <span>{result}</span>
        </div> 
    </div>
  )
}

export default Contact