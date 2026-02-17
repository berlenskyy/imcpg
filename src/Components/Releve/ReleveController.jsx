import React, { useState } from "react";
import ReleveHTML from "./ReleveHTML";
import GradeReportGenerator from "./ReleveForm";
import { GeneratePDF } from "./GeneratePDF.jsx";
import ReleveForm from "./ReleveForm";
import "./RC.css";
const ReleveController = () => {
  const [data, setData] = useState(null);
  const [visibility, setVisibility] = useState(null);

 
  return (
    <>
      <ReleveForm submittedData={setData} visibilit={setVisibility} />
      {data && (
        <>
          <div className={data && visibility ? "viewReleve" : "hideReleve"}>
            <button
              onClick={() => {
                setVisibility(false);
              }}
              className="backBtn"
            >
              Retour
            </button>
            <button 
              onClick={() => GeneratePDF(data)}
              className="downloadBtn"
            >
                Générer PDF
            </button>
            <ReleveHTML data={data} /> 
          </div>
        </>
      )}
    </>
  );
};

export default ReleveController;
