import "./Releve.css";
import "./Bulletin.css";
import logo1 from "./../../assets/logo.png";
import {school} from './../../dataSource.jsx'

const DocHeader =({school})=>
  <>
    <div className="headerWrapper">
      <img src={logo1} alt="" className="logo" />
      <div>
        <p className="nomEc">{school.name}</p>
        <p className="ssection">{'Section '}{school.section[2]}</p>
        <p className="aaddress">
          {school.adress.no+', '+school.adress.street+', '+school.adress.city+', '+school.adress.country}
        </p>
        <p className="ccity"></p>
        <p className="ddept">DÉPARTEMENT DE L’ARTIBONITE</p>
        <p className="eemail">COURRIEL : {school.email}</p>
      </div>
      <img src={logo1} alt="" className="logo" />
    </div>
    <hr />
  </>


const Periode = ({ numero, student }) => (
  <div className="periode"> 
    <DocHeader school={school}/>
    <div className="infos">
      <p className="cp">{student.class}</p>
      <p>{student.year}</p>
    </div>

    <h2 className="title">
      Bulletin de la {numero}<sup>{numero === 1 ? 'ère' : 'ème'}</sup> période
    </h2>

    <p className="name">
      <strong>PRÉNOM :</strong> {student.firstname}
    </p>
    <p className="name">
      <strong>NOM :</strong> {student.lastname}
    </p>

    <table className="grades-table">
      <thead>
        <tr>
          <th>Matières</th>
          <th>Note</th>
          <th>Maximum</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Français</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Mathématiques</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Questionner le monde</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Éducation musicale</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Éducation physique</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Arts visuels</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Langue vivante</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Enseignement moral et civique</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Histoire-Géographie</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Sciences et technologie</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Total</td>
          <td>900</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>Moyenne</td>
          <td>9</td>
          <td>10</td>
        </tr>
      </tbody>
    </table>

    <div className="discipline">
      <p>Absence ( )</p>
      <p>Retard ( )</p>
      <p>Discipline ( )</p>
      <p>Soin ( )</p>
    </div>

    <div className="signatures">
      <div>
        <p>________________________</p>
        <p>VISA DU TITULAIRE</p>
      </div>

      <div>
        <p>________________________</p>
        <p>VISA DU PARENT</p>
      </div>
    </div>

    <div className="direction">
      <p>___________________________</p>
      <p>VISA DE LA DIRECTION</p>
    </div>
    <CodeAppreciation/>
  </div>
);

const CodeAppreciation = () => (
  <div className="code">
    <p className="codeTitle">CODE D’APPRÉCIATION</p>
    <div className="codeWrapper">
      <div  className="codeWidget">
        <span>A<sup>+</sup></span>EXCELLENT
      </div>
      <div className="codeWidget">
        <span>B</span> SATISFAISANT
      </div>
      <div className="codeWidget">
        <span>D</span> INSUFFISANT
      </div>
      <div className="codeWidget">
        <span>A</span> TRÈS SATISFAISANT
      </div>
      <div className="codeWidget">
        <span>C</span> TOUT JUSTE SATISFAISANT
      </div>
      <div className="codeWidget">
        <span>E</span> TRÈS INSUFFISANT
      </div>
    </div>
  </div>
);

const BulletinCP = ({student}) => {
  
  return (
    <div className="page">
      <Periode numero={1} student={student} />
      {/* <CodeAppreciation /> */}
    </div>
  );
};

export default BulletinCP;
