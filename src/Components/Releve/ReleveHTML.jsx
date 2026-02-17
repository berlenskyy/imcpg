import React from 'react'
import logo1 from './../../assets/logo.png'
import './Releve.css'
const ReleveHTML = ({data}) => {
    const infoImcpg = {
        'nomEcole' : 'Institution Mixte Cérélus Pierre Glaude',
        'email':'imcpg.edu@gmail.com',
        'adresse1':'118, Boulevard Jean Jacques Dessalines',
        'adresse2':'Verrettes, Dpt Artibonite'
    }

  return (
    <div className="releve" id='releve-pdf'>
        <div className="headerWrapper">
            <img src={logo1} alt="" className='logo'/>
            <div>
                <p className='nomEc'><strong>{infoImcpg.nomEcole}</strong></p>
                <p>{infoImcpg.adresse1}</p>
                <p>{infoImcpg.adresse2}</p>
                <p>E-mail : {infoImcpg.email}</p>
            </div>
            <img src={logo1} alt="" className='logo'/>
            
        </div>
        <hr/>
        <h2 className="title">RELEVÉ DES NOTES</h2>

        <p className="text">
            L’Institution Mixte Cérélus Pierre Glaude atteste et certifie par la présente
            que l’élève <strong>{data.student.firstname} {data.student.lastname}</strong> en classe de{" "}
            <strong>{data.student.level}</strong> a obtenu les notes suivantes pour
            l’année scolaire <strong>{data.student.year}</strong>.
        </p>

        <table className="notes">
        <tbody>
            <tr className='mat'>
                <td>Matière</td>
                <td>Note</td>
                <td>Coefficient</td>
            </tr>
            {data.subjects.map((m, i) => (
            <tr key={i} className='tableBody'>
                <td>{m.name}</td>
                <td>{m.grade}</td>
                <td>{m.coefficient}</td>
            </tr>
            ))}
            <tr className='tot'>
                <td>Total</td>
                <td>{data.subjects.reduce((acc, m) => acc + parseInt(m.grade), 0)}</td>
                <td>{data.subjects.reduce((acc, m) => acc + parseInt(m.coefficient), 0)}</td>
            </tr>
            <tr className='moy'>
                <td>Moyenne</td>
                <td>{data.average}</td>
                <td>{data.subjects.reduce((acc, m) => acc + parseInt(m.coefficient), 0) * 10 / data.subjects.reduce((acc, m) => acc + parseInt(m.coefficient), 0)}</td>
            </tr>
        </tbody>
        </table>

        <div className="signature">
        <p>________________________</p>
        <p>Signature de la Direction</p>
        </div>
    </div>
  )
}

export default ReleveHTML