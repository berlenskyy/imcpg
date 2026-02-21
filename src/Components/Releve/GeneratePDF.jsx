import React from 'react'
import html2pdf from "html2pdf.js";

export const GeneratePDF = (data, elementId) => {
  console.log("receipt:", data.student.firstname)
  const element = document.getElementById(elementId); 
  html2pdf()
    .set({
      margin: 8,
      filename: `relevé_${data.student.firstname}_${data.student.lastname}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    })
    .from(element)
    .save();
}

