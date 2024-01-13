import React from "react";
import Content from "../Components/Content";

const Certificate = () => {
  const samplePDF = "/PDF/Sample.pdf";
  return (
    <div>
      <Content pdfPath={samplePDF} />
    </div>
  );
};

export default Certificate;
