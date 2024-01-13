import React from 'react'
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const View = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default View
