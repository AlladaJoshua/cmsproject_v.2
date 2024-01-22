import React, { useState, useEffect } from "react";
import "../Css/content.css";
import { pdfjs } from "react-pdf";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import HeaderV2 from "./HeaderV2";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaArrowUp } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Content = () => {
  const pdfPath = "/PDF/Sample.pdf";
  const [data, setData] = useState({
    id: "1",
    pdfName: "Sample.pdf",
    courseTitle: "HTML and CSS",
  });
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);
  const [enableButtonClick, setEnableButtonClick] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isButtonsDisabled, setButtonsDisabled] = useState(false);
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(true);

  useEffect(() => {
    setOverlayVisible((prevVisible) => !prevVisible);
  }, []);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        const dataUrl = canvas.toDataURL();
        setThumbnailUrl(dataUrl);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    fetchThumbnail();
  }, [pdfPath]);

  useEffect(() => {
    const handleOnline = () => {
      setShowNotification({
        type: "info",
        message: "You are back online! You can now download certificates.",
      });

      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    };

    const handleOffline = () => {
      setShowNotification({
        type: "danger",
        message: "You are currently offline. Please connect to the internet.",
      });

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

  const handleDownloadClick = () => {
    if (!overlayVisible || downloadButtonDisabled) {
      return;
    }

    // ... (rest of the code remains the same)

    // Set a flag to enable the download button after overlay click
    setDownloadButtonDisabled(false);
  };

  const handleClick = () => {
    // Toggle the overlay visibility
    setOverlayVisible((prevVisible) => !prevVisible);

    // Disable buttons immediately using CSS class
    setButtonsDisabled(true);

    // Delay enabling buttons by 2 seconds
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 2000);
  };

  const handleHover = () => {
    if (overlayVisible) {
      setButtonsDisabled(true);

      // Delay enabling buttons by 2 seconds
      setTimeout(() => {
        setButtonsDisabled(false);
      }, 3000);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewTooltip = <Tooltip id="viewTooltip">View Certificate</Tooltip>;
  const downloadTooltip = (
    <Tooltip id="downloadTooltip">Download Certificate</Tooltip>
  );

  const shouldShowScrollToTop = window.scrollY > 200;

  return (
    <div>
      <HeaderV2 />
      <section className="content">
        <section className="withSearchBar">
          <h1>Certificate</h1>
          <InputGroup expand="lg" size="sm" className="float-right">
            <Form.Control
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="success" id="button-addon2">
              <FiSearch className="icon search_icon" />
            </Button>
          </InputGroup>
        </section>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        <div className="certificate_thumbnail">
          <div className="cert" onClick={handleClick}>
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div
              className={`overlay${overlayVisible ? " visible" : ""}`}
            >
              {thumbnailUrl && (
                <div className="buttons">
                  <Link to="/viewCert" state={{ data: data }}>
                    <OverlayTrigger placement="top" overlay={viewTooltip}>
                      <button
                        className="view"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        disabled={isButtonsDisabled}
                        onClick={handleHover}
                      >
                        <BiFileFind className="icon view_icon" />
                      </button>
                    </OverlayTrigger>
                  </Link>
                  <OverlayTrigger placement="top" overlay={downloadTooltip}>
                    <button
                      className="download"
                      style={{
                        pointerEvents: overlayVisible ? "auto" : "none",
                      }}
                      onClick={handleDownloadClick}
                      disabled={
                        isButtonsDisabled || downloadButtonDisabled
                      }
                    >
                      <MdOutlineFileDownload className="icon download_icon" />
                    </button>
                  </OverlayTrigger>
                </div>
              )}
            </div>
          </div>
          <p>Course Title</p>
        </div>
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
          }}
        >
          {showNotification.message}
        </Alert>
      )}
      <div
        className={`scroll-to-top${shouldShowScrollToTop ? " visible" : ""}`}
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: shouldShowScrollToTop ? "20px" : "-40px",
          right: "20px",
          cursor: "pointer",
          opacity: shouldShowScrollToTop ? 1 : 0,
          transition: "opacity 0.2s ease-in-out, bottom 0.2s ease-in-out",
          borderRadius: "100px",
          border: "1px solid #ccc",
          background: "#fff",
          padding: "15px",
        }}
      >
        <FaArrowUp />
      </div>
    </div>
  );
};

export default Content;
