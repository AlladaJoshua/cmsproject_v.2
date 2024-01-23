import React, { useState, useEffect } from "react";
import "../Css/content.css";
import cert from "../assets/cert.png";
import { pdfjs } from "react-pdf";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaArrowUp } from "react-icons/fa";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderV2 from "./HeaderV2";

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

  useEffect(() => {
    // Assuming you have a way to detect whether the overlay is visible or not
    // For demonstration purposes, I'm toggling it every 5 seconds
    const interval = setInterval(() => {
      setOverlayVisible((prevVisible) => !prevVisible);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Fetch the first page

        const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale as needed
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert the canvas content to a data URL
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

  const handleDownloadClick = () => {
    if (!overlayVisible) {
      // Reset button states if the overlay is not visible
      setDisableDownloadButton(false);
      setEnableButtonClick(true);
      return; // Do nothing if the overlay is not visible
    }

    if (disableDownloadButton || !enableButtonClick) {
      return; // Do nothing if the button is disabled or the click is not enabled
    }

    // Check if the user is online
    if (!window.navigator.onLine) {
      setShowNotification({
        type: "danger",
        message:
          "You are currently offline. Please connect to the internet and try again.",
      });
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
      return;
    }

    // Trigger the download
    const link = document.createElement("a");
    link.href = pdfPath;
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

    // Disable the button for a specified duration (e.g., 10 seconds)
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
      setShowNotification(null);
    }, 5000); // 5000 milliseconds (5 seconds)

    setEnableButtonClick(false);
    setTimeout(() => {
      setEnableButtonClick(true);
    }, 5000);

    setTimeout(() => {
      setOverlayVisible(false);
    }, 5000); // 3000 milliseconds (3 seconds)
  };

  const handleViewClick = () => {
    if (!overlayVisible) {
      // Reset button states if the overlay is not visible
      setEnableButtonClick(true);
      return; // Do nothing if the overlay is not visible
    }

    if (!enableButtonClick) {
      return; // Do nothing if the click is not enabled
    }

    // Disable the link for a specified duration (e.g., 5 seconds)
    const link = document.getElementById("viewLink");
    if (link) {
      link.style.pointerEvents = "none";
    }

    // Show the notification (adjust the type and message as needed)
    setShowNotification({
      type: "info",
      message: "Viewing is disabled for 5 seconds.",
    });

    setTimeout(() => {
      // Enable the link after the specified duration
      if (link) {
        link.style.pointerEvents = "auto";
      }
      // Close the notification after 5 seconds
      setShowNotification(null);
    }, 5000); // 5000 milliseconds (5 seconds)
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
          <div className="cert">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div className={`overlay${overlayVisible ? " visible" : ""}`}>
              {thumbnailUrl && (
                <div className="buttons">
                  <Link id="viewLink" to="/viewCert" state={{ data: data }}>
                    <OverlayTrigger placement="top" overlay={viewTooltip}>
                      <button
                        className="view"
                        style={{
                          pointerEvents: overlayVisible ? "auto" : "none",
                        }}
                        onClick={handleViewClick}
                        disabled={!enableButtonClick}
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
                      disabled={!enableButtonClick || disableDownloadButton}
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
        {/* Repeat the above structure for other certificate thumbnails */}
      </section>
      {showNotification && (
        <Alert
          variant={showNotification.type}
          onClose={() => setShowNotification(null)}
          dismissible
          style={{
            position: "fixed",
            top: "10px", // Adjust the top position as needed
            right: "10px", // Adjust the right position as needed
            zIndex: 1000, // Ensure the alert appears above other elements
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
