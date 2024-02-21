import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Modal, Button, Alert } from "react-bootstrap";
import { IoIosArrowBack, IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineFileDownload, MdOutlineTextSnippet } from "react-icons/md";
import Team_D_HeaderV2 from "./Team_D_HeaderV2";
import "../Css/view.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Team_D_View = () => {
  const location = useLocation();
  const { pdfName, courseTitle } = location.state; // Destructure pdfName from location.state
  const pdfURL = `/PDF/${pdfName}`;

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleDownloadClick = () => {
    if (!window.navigator.onLine) {
      handleOfflineNotification();
      return;
    }

    const link = document.createElement("a");
    link.href = pdfURL;
   link.download = pdfName;

    link.addEventListener("error", () => {
      handleDownloadError();
    });

    link.click();
    handleDownloadSuccess();
  };

  const handleOfflineNotification = () => {
    setShowNotification({
      type: "danger",
      message:
        "You are currently offline. Please connect to the internet and try again."
    });
    setTimeout(() => setShowNotification(null), 5000);
  };

  const handleDownloadError = () => {
    setShowNotification({
      type: "danger",
      message: "Error during download. Please try again."
    });
    setTimeout(() => setShowNotification(null), 5000);
  };

  const handleDownloadSuccess = () => {
    setShowNotification({
      type: "success",
      message: "Download successful!"
    });
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
      setShowNotification(null);
    }, 5000);
  };

  useEffect(() => {
    // Event listener for online/offline status
    const handleOnline = () => {
      setShowNotification({
        type: "info",
        message: "You are back online! You can now download certificates."
      });
      setTimeout(() => setShowNotification(null), 5000);
    };

    const handleOffline = () => {
      setShowNotification({
        type: "danger",
        message: "You are currently offline. Please connect to the internet."
      });
      setTimeout(() => setShowNotification(null), 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Tooltips
  const goBackTooltip = <Tooltip id="goBackTooltip">Go Back</Tooltip>;
  const closeTooltip = <Tooltip id="closeTooltip">Close</Tooltip>;
  const downloadTooltip = (
    <Tooltip id="downloadTooltip">Download Certificate</Tooltip>
  );
  const criteriaTooltip = (
    <Tooltip id="criteriaTooltip">Certificate Criteria</Tooltip>
  );

  return (
    <div>
      {/* Team D header component */}
      <Team_D_HeaderV2 />
      <section className="contentViewPdf">
        <section className="headerView">
          <div className="goBack_title">
            {/* Go back button */}
            <Link to="/certificate">
              <OverlayTrigger placement="bottom" overlay={goBackTooltip}>
                <button className="goBack">
                  <IoIosArrowBack />
                </button>
              </OverlayTrigger>
            </Link>
            {/* Certificate title */}
            <h1 style={{ textTransform: "capitalize" }}>{courseTitle}</h1>
          </div>
          {/* Horizontal rule */}
          <div className="hr_view"></div>
        </section>
        <section className="certificatesView">
          {/* PDF viewer */}
          <div className="filePdfView">
            <Document
              file={pdfURL}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
          {/* Control buttons */}
          <div className="control">
            {/* Modal button */}
            <div className="TeamD_modal_btn">
              <OverlayTrigger placement="top" overlay={criteriaTooltip}>
                <Button
                  variant="primary"
                  className="modalBTN"
                  onClick={handleShowModal}
                >
                  <MdOutlineTextSnippet />
                </Button>
              </OverlayTrigger>
            </div>
            {/* Download button */}
            <div className="download_View">
              <OverlayTrigger placement="top" overlay={downloadTooltip}>
                <Button
                  variant="success"
                  className="downloadBTN"
                  onClick={handleDownloadClick}
                  disabled={disableDownloadButton}
                >
                  <MdOutlineFileDownload />
                </Button>
              </OverlayTrigger>
            </div>
            {/* Certificate Criteria Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton className="TeamD_mdl_hdr">
                <Modal.Title>
                  <div className="modalTitle">
                    <h4>Certificate Criteria</h4>
                    <p>
                      {/* Certificate criteria */}
                      <b>Course:</b> {/* courseTitle */}
                      <br />
                      <b>Course Code:</b> {/* courseCode */}
                      <br />
                      <b>Instructor:</b> {/* instructor */}
                    </p>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Passing Score: Minimum score of 80% or higher is required.
                </p>
                <p>
                  {/* Replace data properties with appropriate values */}
                  Quizzes Scores {/* data.quizzes */}
                  <br />
                  Quiz 1: {/* quiz1 */}
                  <br />
                  Quiz 2: {/* data.quiz2 */}
                  <br />
                  Assesment Score:
                </p>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      </section>
      {/* Notification for download status */}
      {showNotification && (
        <Alert
          variant={showNotification.type}
          onClose={() => setShowNotification(null)}
          dismissible
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            minWidth: "300px"
          }}
        >
          {showNotification.message}
        </Alert>
      )}
    </div>
  );
};

export default Team_D_View;
