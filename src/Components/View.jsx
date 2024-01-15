import React, { useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/view.css";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImEnlarge } from "react-icons/im";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload, MdOutlineTextSnippet } from "react-icons/md";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const View = () => {
  const location = useLocation();
  const { data } = location.state;
  const pdfURL = `/PDF/${data.pdfName}`;
  console.log(location, "Props Location");

  const [show, setShow] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDownloadClick = () => {
    // Check if the user is online
    if (!window.navigator.onLine) {
      setShowNotification({
        type: "danger",
        message:
          "You are currently offline. Please connect to the internet and try again.",
      });

      // Close the offline notification after 5 seconds
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
      return;
    }

    // Trigger the download
    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = "Certificate.pdf";

    link.addEventListener("abort", () => {
      setShowNotification({
        type: "danger",
        message: "Download aborted. Please try again.",
      });
    });

    link.addEventListener("error", () => {
      setShowNotification({
        type: "danger",
        message: "Error during download. Please try again.",
      });
    });

    link.click();

    // Show the notification
    setShowNotification({
      type: "success",
      message: "Download successful!",
    });

    // Disable the button for a specified duration (e.g., 5 seconds)
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
      setShowNotification(null);
    }, 5000); // 5000 milliseconds (5 seconds)
  };

  useEffect(() => {
    const handleOnline = () => {
      setShowNotification({
        type: "info",
        message: "You are back online! You can now download certificates.",
      });

      // Close the online notification after 5 seconds
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    const handleOffline = () => {
      setShowNotification({
        type: "danger",
        message: "You are currently offline. Please connect to the internet.",
      });

      // Close the offline notification after 5 seconds
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
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
  const criteriaTooltip = <Tooltip id="criteriaTooltip">Certificate Criteria</Tooltip>;

  return (
    <div>
      <Header />
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
            <h1>{data.courseTitle}</h1>
          </div>
          <div className="hr_view"></div>
        </section>
        <section className="certificatesView">
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
              <OverlayTrigger placement="top" overlay={criteriaTooltip}>
                <Button
                  variant="primary"
                  className="modalBTN"
                  onClick={handleShow}
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

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="modalTitle">
                    <h4>Certificate Criteria</h4>
                    <p>
                      <b>Course:</b> HTML and CSS
                      <br />
                      <b>Course Code:</b> C01_HTML_AND_CSS
                      <br />
                      <b>Instructor:</b> Joshua Allada
                    </p>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Start Date: <br />
                  End Date: <br />
                  Total of Hours:
                </p>
                <p>
                  Quizzes: <br />
                  Quiz 1: <br />
                  Quiz 2:
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
            minWidth: "300px",
          }}
        >
          {showNotification.message}
        </Alert>
      )}
    </div>
  );
};

export default View;
