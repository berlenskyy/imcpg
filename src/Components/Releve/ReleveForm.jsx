import React, { useState } from 'react';
import html2pdf from "html2pdf.js";
import './ReleveForm.css'


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Schéma de validation
const schema = Yup.object().shape({
  firstname: Yup.string()
    .required("Le prénom est obligatoire")
    .min(2, "Minimum 2 caractères"),
  lastname: Yup.string().transform((value) => value?.toUpperCase())
    .required("Le nom de famille est obligatoire")
    .min(2, "Minimum 2 caractères"),
  level: Yup.string().required("Niveau d\'étude obligatoire"),  
  year: Yup.string().required("Année obligatoire"),
  // email: Yup.string()
  //   .required("Email obligatoire")
  //   .email("Format invalide"),
  // password: Yup.string()
  //   .required("Mot de passe obligatoire")
  //   .min(8, "Minimum 8 caractères")
  //   .matches(/[A-Z]/, "Doit contenir une majuscule")
  //   .matches(/[0-9]/, "Doit contenir un chiffre")
  //   .matches(/[@$!%*?&]/, "Doit contenir un caractère spécial"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
  //   .required("Confirmation obligatoire"),
  // gender: Yup.string().required("Choix obligatoire"),

  // birthDate: Yup.date()
  //   .required("Date de naissance obligatoire")
  //   .max(new Date(), "La date doit être dans le passé"),
});





const ReleveForm = ({onSubmitt, visibilit}) => {
  
//****3 Objects for storing student, subject and average info********** */
  const [student, setStudent] = useState({ firstname: '', lastname: '', year: ' ', class: '' });
  const [subjects, setSubjects] = useState([{ name: '', grade: '', coefficient: 200 }]);
  const [average, setAverage] = useState(null);
  const [visibility, setVisibility] = useState(true);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 23}, (_, i) =>`${currentYear-i} - ${currentYear-i+1}`)


//***********Handle student change************ */
  const handleStudentChange = (e) => {
    const subName6e = [
      {name:'Lecture ou Exposé',grade: 0,  coefficient:0}, 
      {name:'Anglais Oral', grade:0, coefficient:0}, 
      {name:'Anglais Écrit',grade: 0,coefficient: 0},
      {name:'Espagnol Oral',grade: 0,coefficient: 0},
      {name:'Espagnol Écrit',grade: 0,coefficient: 0},
      {name:'Dessin/Peinture',grade: 0, coefficient:0},
      {name:'Histoire', grade: 0, coefficient:0},
      {name:'Géographie',grade: 0,coefficient:0},
      {name:'Éducation Civique',grade: 0, coefficient:0},
      {name:'Sciences Expérimentales',grade:  0, coefficient:0},
      {name:'Mathématiques', grade:0, coefficient:0},
      {name:'Informatique', grade: 0,coefficient: 0}
    ]
    setSubjects(subName6e)
    
    setStudent({ ...student, [e.target.name]: e.target.value });

  };
//***********Handle subject change************ */
  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects); 
    
  };
//*************Add subject *************** */
  const addSubject = () => {
    setSubjects([...subjects, { name: '', grade: '', coefficient: 1 }]);
  };
//************Removing each subject*************** */
  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };
//*************Calculating The Average********************* */
  const calculateAverage = () => {
    let totalWeighted = 0;
    let totalCoeff = 0;
    subjects.forEach(sub => {
      const grade = parseFloat(sub.grade);
      const coeff = parseInt(sub.coefficient);
      if (!isNaN(grade) && !isNaN(coeff)) {
        totalWeighted += grade * coeff;
        totalCoeff += coeff;
      }
    });
    setAverage(totalCoeff > 0 ? (totalWeighted  / totalCoeff).toFixed(2) : 0);
  };

const { register, handleSubmit, formState: { errors } } = useForm(
      { resolver: yupResolver(schema), mode: "onChange", }
    );
  
    //***********Handle submit variable************ */
  const onSubmit = (data) => {
    console.log('data : ', data);
    console.log('form validée', data); 
    onSubmitt({student, subjects, average});
    visibilit(visibility);
  };

//******* User Rendering ******** */
  return (
    <div className='dForm'>
      <h1>Gestion de Relevés de Notes IMCPG</h1>
      <p></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='formElements'>
          <div className='lN_Wrapper'>
            <input type="text" {...register("lastname", { required: true })} onChange={handleStudentChange}  className={errors.lastname ? 'nom error':'nom'} placeholder={'Saisir le nom de l\'élève'} />
            <p className="error">{errors.lastname && errors.lastname.message}</p>
          </div>
          <div className="lN_Wrapper">
            <input type="text" {...register("firstname", { required: true })} onChange={handleStudentChange}  className={errors.firstname ? 'prenom error':'prenom'} placeholder={'Saisir le ou les prénom(s) de l\'élève'} />
             <p className="error">{errors.firstname && errors.firstname.message}</p>
          </div>
          <div className='fEl'>
            <div>
              <label>Classe :</label>
              <select name="level" {...register("level", { required: true })}   onChange={handleStudentChange} className='classe'>
                <option value='' >Choisir un niveau</option>
                <option value={'9e  année fondamentale'}>9e AF</option>
                <option value={'6e année fondamentale'}>6e AF</option>
                <option value={'Nouveau Secondaire 2'}>NS2</option>
                <option value={'Nouveau Secondaire 1'}>NS1</option>
                <option value={'8e année fondamentale'}>8e AF</option>
                <option value={'7e année fondamentale'}>7e AF</option>
                <option value={'5ème année'}>CM1</option>
              </select>
            </div>
            <p className='error'>{errors.level && errors.level.message}</p>
          </div>

          <div className='fEl'>
            <label>Année académique :</label>
            <select name="year" {...register("year", { required: true })}  onChange={handleStudentChange} className='annee'>
              <option value=''>Choisir l'année académique</option>
              {years.map((year) =>(
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <p className="error">{errors.year && errors.year.message}</p>
          </div>
        </div>
        {/* <h3>Matières</h3> */}
        <table>
          <thead>
            <tr>
              <th>Matières</th>
              <th>Note</th>
              <th>Coefficient</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr key={index}>
                <td><input type="text" value={sub.name} onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} required /></td>
                <td><input type="number" min="0"  value={sub.grade} onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)} required /></td>
                <td><input type="number" min="1"  value={sub.coefficient} onChange={(e) => handleSubjectChange(index, 'coefficient', e.target.value)} required /></td>
                <td><button type="button" onClick={() => removeSubject(index)}>Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addSubject} className='ajout'>Ajouter Matière</button>
        <button type="button" onClick={calculateAverage} className='moyenne'>Calculer Moyenne</button>
        {average && <p className='moyText'>Moyenne : {average}</p>}
        <button type="submit" onClick ={(e)=>{setVisibility(true); console.log('vis : '+visibility); }} className='generer'>Aperçu</button>
      </form>
    </div>
  );
};

export default ReleveForm;