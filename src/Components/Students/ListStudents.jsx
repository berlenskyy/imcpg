import "./ListStudents.css";
import { students } from "../../dataSource";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BulletinCP from "../Releve/Bulletin"; 
import { useState } from "react";

const ListStudents = () => {
    
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenBulletin = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };
  
  const Show = ({student}) => {
    return (
      <> 
        <div className="show">
          <div className="showHeader">
            <h2>
              Bulletin de {student.firstname} {student.lastname}
            </h2>
            <ArrowBackIcon className="backIcon" onClick={handleClose} />
            <FileDownloadIcon
              className="downloadIcon"
              onClick={() =>
                console.log("Download clicked for student:", student)
              }
            />
          </div>
          <BulletinCP student={student} />
        </div>
      </>
    );
  };

  return (
    <div className="listStudents">
      <div className="listStudentsContainer">
        <div className="listHeader">
          <h2>Liste des élèves</h2>
          <button className="addButton">Ajouter un élève</button>
        </div>
        <table className="studentsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Classe</th>
              <th>Année scolaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.lastname}</td>
                <td>{student.firstname}</td>
                <td>{student.class}</td>
                <td>{student.year}</td>
                <td>
                  <button className="editButton">Modifier</button>
                  <button className="deleteButton">Supprimer</button>
                  <button
                    className="bulletinButton"
                    onClick={() => handleOpenBulletin(student)}
                  >
                    Bulletin
                  </button>
                  <button className="releveButton">Releve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
      {/* Modal pour afficher le bulletin */}
      {selectedStudent && 
      <div className={`bulletinModal ${open ? "open" : "close"}`}>
        <Show student={selectedStudent} className="bulletinContent" />
      </div>}
    </div>
  );
};

export default ListStudents;
