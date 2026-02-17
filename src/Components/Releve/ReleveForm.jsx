import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import "./ReleveForm.css"; 
import { useForm , useFieldArray, set} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";  
import { get } from "react-scroll/modules/mixins/scroller";

// Schéma de validation
const schema = Yup.object().shape({
  firstname: Yup.string()
    .required("Le prénom est obligatoire")
    .min(2, "Minimum 2 caractères"),
  lastname: Yup.string()
    .transform((value) => value?.toUpperCase())
    .required("Le nom de famille est obligatoire")
    .min(2, "Minimum 2 caractères"),
  level: Yup.string().required("Niveau d\'étude obligatoire"),
  year: Yup.string().required("Année obligatoire"),
  subjects: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nom de la matière obligatoire"),
      grade: Yup.number().required("La note est obligatoire"),
      coefficient: Yup.number().required("Coefficient Obligatoire").test(
        "coef-gte-grade", 
        "Le coefficient doit être supérieur ou égal à la note", 
        function (value) { 
          const { grade } = this.parent; 
          return value >= grade; 
        }
      )
    })
  )
    


  /* 
    email: Yup.string()
      .required("Email obligatoire")
      .email("Format invalide"),
    password: Yup.string()
      .required("Mot de passe obligatoire")
      .min(8, "Minimum 8 caractères")
      .matches(/[A-Z]/, "Doit contenir une majuscule")
      .matches(/[0-9]/, "Doit contenir un chiffre")
      .matches(/[@$!%*?&]/, "Doit contenir un caractère spécial"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
      .required("Confirmation obligatoire"),
    gender: Yup.string().required("Choix obligatoire"),

    birthDate: Yup.date()
      .required("Date de naissance obligatoire")
      .max(new Date(), "La date doit être dans le passé"),
*/
});
const ReleveForm = ({ submittedData, visibilit }) => {
  //****3 Objects for storing student, subject and average info********** */
  //-------student
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    year: " ",
    level: "",
  });
  //--------- Subjects
  const [subjects, setSubjects] = useState([
    { name: "", grade: "", coefficient: 200 },
  ]);
  //--------- Average
  const [average, setAverage] = useState(null);
  //-------Visibility
  const [visibility, setVisibility] = useState(true);
  //--------- YEAR
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 23 },
    (_, i) => `${currentYear - i} - ${currentYear - i + 1}`,
  );

  const [openTableNote, setOpenTableNote] = useState(false);


  // état local pour savoir si une ligne est validée ou non 
  const [validatedRows, setValidatedRows] = useState({}); 
  const toggleValidation = async (index) => { 
    // si la ligne est déjà validée → on la réactive 
    if (validatedRows[index]) { 
      setValidatedRows((prev) => ({ ...prev, [index]: false })); 
      return; 
    }   

    // if not, we launch the RHF validation on that line 
    const valid = await trigger(
      [ `subjects.${index}.name`, `subjects.${index}.grade`, `subjects.${index}.coefficient` ]
    );
    if (valid) { 
      setValidatedRows((prev) => ({ ...prev, [index]: true }));
    } 
  };
  //*************Calculating The Average********************* */
  const calculateAverage = () => {
    let totalWeighted = 0;
    let totalCoeff = 0;
    getValues().subjects.forEach((sub) => {
      const grade = parseFloat(sub.grade);
      const coeff = parseInt(sub.coefficient);
      if (!isNaN(grade) && !isNaN(coeff)) {
        totalWeighted += grade;
        totalCoeff += coeff;
      }
    });
    setAverage(totalCoeff > totalWeighted ? (totalWeighted *10/ totalCoeff).toFixed(2) : 0);
  };

  const { control, register, handleSubmit, trigger, getValues, formState: { errors }, } = useForm({ 
    defaultValues: {
      firstname: "",
      lastname: "",
      level: "",
      year: "",
      subjects:[{name: "", grade: "", coefficient: ''}]
    },
    resolver: yupResolver(schema), 
    mode: "onBlur" 
  });

const {fields, append, remove} = useFieldArray({
  control,
  name: "subjects"
})


//***********Handle submit variable************ */
const onSubmit = (data) => {
  const newStudent = {
    firstname: data.firstname, 
    lastname: data.lastname, 
    year: data.year, 
    level: data.level 
  }; 
  setStudent(newStudent);

  setVisibility(true);
  setSubjects(data.subjects);
  submittedData({ student: newStudent, subjects: data.subjects, average });
  visibilit(visibility);
};

  // Verify only the fixed fields before opening the notes table 
  const checkStaticFields = async () => { 
    const valid = await trigger(["lastname", "firstname", "level", "year"]);  
    if (valid) { 
      setOpenTableNote(true); 
    
    } 
};
  //******* User Rendering ******** */
  return (
    <div className="dForm">
      <h1>Gestion de Relevés de Notes IMCPG</h1>
      <p></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formElements">
          <div className="lN_Wrapper">
            <input
              type="text"
              {...register("lastname", { required: true })}
              // onChange={handleStudentChange}
              className={errors.lastname ? "nom error" : "nom"}
              placeholder={"Saisir le nom de l'élève"}
              disabled={openTableNote}
            />
            <p className="error">
              {errors.lastname && errors.lastname.message}
            </p>
          </div>
          <div className="lN_Wrapper">
            <input
              type="text"
              {...register("firstname", { required: true })}
              // onChange={handleStudentChange}
              className={errors.firstname ? "prenom error" : "prenom"}
              placeholder={"Saisir le ou les prénom(s) de l'élève"}
              disabled={openTableNote}
            />
            <p className="error">
              {errors.firstname && errors.firstname.message}
            </p>
          </div>
          <div className="fEl">
            <div>
              <label>Classe :</label>
              <select
                name="level"
                {...register("level", { required: true })}
                disabled={openTableNote}
                // onChange={handleStudentChange}
                className="classe"
              >
                <option value="">Choisir un niveau</option>
                <option value={"9e  année fondamentale"}>9e AF</option>
                <option value={"6e année fondamentale"}>6e AF</option>
                <option value={"Nouveau Secondaire 2"}>NS2</option>
                <option value={"Nouveau Secondaire 1"}>NS1</option>
                <option value={"8e année fondamentale"}>8e AF</option>
                <option value={"7e année fondamentale"}>7e AF</option>
                <option value={"5ème année"}>CM1</option>
              </select>
            </div>
            <p className="error">{errors.level && errors.level.message}</p>
          </div>

          <div className="fEl">
            <label>Année académique :</label>
            <select
              name="year"
              {...register("year", { required: true })}
              disabled={openTableNote}
              // onChange={handleStudentChange}
              className="annee"
            >
              <option value="">Choisir l'année académique</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <p className="error">{errors.year && errors.year.message}</p>
          </div>
        </div>
        <button type="button" onClick={checkStaticFields} className={openTableNote?'disappeared':'btValider'}>valider</button>
        {openTableNote && (
          <>
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
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td>
                      <input
                        type="text"
                        placeholder={" Entrer le nom de la "+(1+index)+(index==0 ?'ère':'ème')+" matière  ici"}
                        disabled={validatedRows[index]}
                        {...register(`subjects[${index}].name`, { required: true })}
                        required
                      />
                      <p className="error">{errors?.subjects?.[index]?.name?.message}</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"                     
                        placeholder={'note'}
                        {...register(`subjects[${index}].grade`, { required: true })}
                        disabled={validatedRows[index]}
                        required
                      />
                      <p className="error">{errors?.subjects?.[index]?.grade?.message}</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        {...register(`subjects[${index}].coefficient`, { required: true })}
                        disabled={validatedRows[index]}
                        required
                      />
                      <p className="error">{errors?.subjects?.[index]?.coefficient?.message}</p>
                    </td>
                    <td>
                      <button
                      className="modBtn"
                        type="button"
                        onClick={() => toggleValidation(index)}
                      >
                        {validatedRows[index] ? 'modifier':'valider'}
                      </button>
                      <button
                      className="delBtn"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        {validatedRows[index] ? 'supprimer':'effacer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {average && <p className="moyText">Moyenne : {average}</p>}
            <button type="button" onClick={()=>append({name: '', grade:'', coefficient:''})} className="ajout">
              Ajouter Matière
            </button>
            <button
              type="button"
              onClick={calculateAverage}
              className="moyenne"
            >
              Calculer Moyenne
            </button>
            
            <button
              type="submit"
              // {onClick ={(e)=>{setVisibility(true); console.log('data : '+data); }}}
              className="generer"
              
            >
              Aperçu
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ReleveForm;
