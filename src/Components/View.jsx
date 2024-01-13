import React from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import { useState } from "react";
// import "../Css/view.css";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImEnlarge } from "react-icons/im";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const View = () => {
  const location = useLocation();
  const { data } = location.state;
  const pdfURL = `/PDF/${data.pdfName}`;
  console.log(location, "Props Location");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <section className="contentViewPdf">
        <section className="headerView">
          <h1>{data.courseTitle}</h1>
          <div className="hr_view"></div>
        </section>
        <section className="certificatesView">
          <div className="control_top">
            <button><ImEnlarge /></button>
          </div>
          <div className="filePdfView">
            <Document file={pdfURL}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
          <div className="control">
            <div className="modal_btn">
              <Button variant="primary" onClick={handleShow}>
                Launch demo modal
              </Button>
            </div>
            <div className="download_View">
              <Button variant="primary">Download</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you are reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      </section>
    </div>
  );
};

export default View;
