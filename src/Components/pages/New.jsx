import { useState } from 'react';
import { createStudent } from '../../Services/StudentService.js'; 
import "./New.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  

 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    country: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adapter birthdate en objet Date si nécessaire
    const payload = {
      ...formData,
      birthdate: new Date(formData.birthdate)
    };

    createStudent(payload)
      .then(response => {
        console.log("Étudiant créé:", response.data);
        alert(`Étudiant ${response.data.firstname} ${response.data.lastname} ajouté avec succès !`);
      })
      .catch(error => {
        console.error("Erreur lors de la création:", error);
        alert("Impossible de créer l'étudiant.");
      });
  };

 
 
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Upload Image :{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  name=""
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
                <div>
                  <button>Add</button>
                  <button type='reset'>Cancel</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
