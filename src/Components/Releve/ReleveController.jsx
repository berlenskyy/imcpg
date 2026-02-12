import React, { useState } from 'react'
import ReleveHTML from './ReleveHTML'
import GradeReportGenerator from './ReleveForm'
import {GeneratePDF} from './GeneratePDF.jsx'
import ReleveForm from './ReleveForm'
import './RC.css'
const ReleveController = () => {
    const [data, setData] = useState(null);
    const [visibility, setVisibility] = useState(null);

    console.log(visibility)
    return(
        <>
            <ReleveForm onSubmitt={setData} visibilit={setVisibility} />
            { 
                data &&(
                <>
                    <div className={data && visibility ?"viewReleve": 'hideReleve'} >
                        <ReleveHTML data={data} />
                        <button onClick={() =>{setVisibility(false)}}>Retour</button>  
                        <button onClick={() => GeneratePDF(data)}>Générer PDF</button>  
                    </div>
                </>
                )
            }
        </>
    )
}

export default ReleveController