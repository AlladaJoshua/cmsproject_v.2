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
    link.download = "Certificate.pdf";

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
      <Team_D_HeaderV2 />
      <section className="contentViewPdf">
        <section className="headerView">
          <div className="goBack_title">
            <Link to="/certificate">
              <OverlayTrigger placement="bottom" overlay={goBackTooltip}>
                <button className="goBack">
                  <IoIosArrowBack />
                </button>
              </OverlayTrigger>
            </Link>
            {/* Replace data.courseTitle with the appropriate title */}
            <h1 style={{ textTransform: "capitalize" }}>{courseTitle}</h1>
          </div>
          <div className="hr_view"></div>
        </section>
        <section className="certificatesView">
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
          <div className="control">
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

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton className="TeamD_mdl_hdr">
                <Modal.Title>
                  <div className="modalTitle">
                    <h4>Certificate Criteria</h4>
                    <p>
                      {/* Replace data properties with appropriate values */}
                      <b>Course:</b> {/* data.courseTitle */}
                      <br />
                      <b>Course Code:</b> {/* data.courseCode */}
                      <br />
                      <b>Instructor:</b> {/* data.instructor */}
                    </p>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  {/* Replace data properties with appropriate values */}
                  Start Date: {/* data.startDate */}
                  <br />
                  End Date: {/* data.endDate */}
                  <br />
                  Total of Hours: {/* data.totalHours */}
                </p>
                <p>
                  {/* Replace data properties with appropriate values */}
                  Quizzes: {/* data.quizzes */}
                  <br />
                  Quiz 1: {/* data.quiz1 */}
                  <br />
                  Quiz 2: {/* data.quiz2 */}
                </p>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      </section>
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
