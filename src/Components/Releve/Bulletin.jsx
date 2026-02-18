import "./Releve.css";
import "./Bulletin.css";
import logo1 from "./../../assets/logo.png";

const Periode = ({ numero }) => (
  <div className="periode">
    <div className="headerWrapper">
      <img src={logo1} alt="" className="logo" />
      <div>
        <p className="nomEc">INSTITUTION MIXTE CERELUS PIERRE GLAUDE</p>
        <p className="ssection">SECTION FONDAMENTALE</p>
        <p className="aaddress">
          118, BOULEVARD JEAN JACQUES DESSALINES, VERRETTES, HAÏTI, (W.I)
        </p>
        <p className="ccity"></p>
        <p className="ddept">DÉPARTEMENT DE L’ARTIBONITE</p>
        <p className="eemail">COURRIEL : imcpg.edu@gmail.com</p>
      </div>
      <img src={logo1} alt="" className="logo" />
    </div>
    <hr />
    <div className="infos">
      <p className="cp">CP</p>
      <p>2024 - 2025</p>
    </div>

    <h2 className="title">
      Bulletin de la 1<sup>ère</sup> période
    </h2>

    <p className="name">
      <strong>PRÉNOM :</strong> Mykendher
    </p>
    <p className="name">
      <strong>NOM :</strong> SILVAIN
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

const BulletinCP = () => {
  return (
    <div className="page">
      <Periode numero={1} />
      {/* <Periode numero={2} student={student} />
      <Periode numero={3} student={student} /> */}

      <CodeAppreciation />
      {/* <CodeAppreciation />
      <CodeAppreciation /> */}
    </div>
  );
};

export default BulletinCP;
