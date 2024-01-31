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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaArrowUp } from "react-icons/fa";
import NoCert from "../assets/undraw_learning_re_32qv.svg";

import Team_D_HeaderV2 from "./Team_D_HeaderV2";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Team_D_Content = () => {
  const [pdfFileNames, setPdfFileNames] = useState([]); // State to store the array of PDF file names fetched from API
  const [thumbnails, setThumbnails] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [disableDownloadButtons, setDisableDownloadButtons] = useState([]);
  const [enableViewButtons, setEnableViewButtons] = useState([]);
  const [overlayVisibilities, setOverlayVisibilities] = useState([]);
  const [disableViewButtons, setDisableViewButtons] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 769);
  };

  useEffect(() => {
    // Fetch PDF file names from API
    fetchPdfFileNamesFromApi();
    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once during mount

  const fetchPdfFileNamesFromApi = async () => {
    try {
      // Replace 'apiEndpoint' with your actual API endpoint to fetch PDF file names
      const response = await fetch(
        "http://localhost:8080/api/certifications/myCertification/1"
      );
      const data = await response.json();
      if (data) {
        setPdfFileNames(data);
      }
    } catch (error) {
      console.error("Error fetching PDF file names:", error);
    }
  };
  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails = [];
      const newDisableDownloadButtons = [];
      const newEnableViewButtons = [];
      const newOverlayVisibilities = [];
      const newDisableViewButtons = [];

      for (let i = 0; i < pdfFileNames.length; i++) {
        const pdfPath = `/PDF/${pdfFileNames[i].certificate_file}`; // Assuming certificate_file contains the path to the PDF
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
          newThumbnails.push(dataUrl);
          newDisableDownloadButtons.push(false);
          newEnableViewButtons.push(true);
          newOverlayVisibilities.push(false);
          newDisableViewButtons.push(false);
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      }

      setThumbnails(newThumbnails);
      setDisableDownloadButtons(newDisableDownloadButtons);
      setEnableViewButtons(newEnableViewButtons);
      setOverlayVisibilities(newOverlayVisibilities);
      setDisableViewButtons(newDisableViewButtons);
    };

    fetchThumbnails();
  }, [pdfFileNames]);

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

  const handleDownloadClick = (index) => () => {
    if (!overlayVisibilities[index]) {
      setDisableDownloadButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
      return;
    }

    if (disableDownloadButtons[index] || !enableViewButtons[index]) {
      return;
    }

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

    const pdfPath = `/PDF/${pdfFileNames[index].certificate_file}`; // Assuming certificate_file contains the path to the PDF
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

    setShowNotification({
      type: "success",
      message: "Download successful!",
    });

    setDisableDownloadButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? true : button))
    );
    setTimeout(() => {
      setDisableDownloadButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setShowNotification(null);
    }, 5000);

    setEnableViewButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? false : button))
    );
    setTimeout(() => {
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
    }, 0);

    setTimeout(() => {
      setOverlayVisibilities((prevVisibilities) =>
        prevVisibilities.map((visibility, idx) =>
          idx === index ? false : visibility
        )
      );
    }, 0);
  };

  const handleViewClick = (index) => () => {
    if (!overlayVisibilities[index]) {
      setEnableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? true : button))
      );
      setDisableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      return;
    }

    if (!enableViewButtons[index] || disableViewButtons[index]) {
      return;
    }

    const link = document.getElementById(`viewLink_${index}`);
    const viewButton = document.getElementById(`viewButton_${index}`);

    if (link) {
      link.style.pointerEvents = "none";
    }

    if (viewButton) {
      viewButton.style.pointerEvents = "none";
    }

    setShowNotification({
      type: "info",
      message: "Viewing is disabled for 5 seconds.",
    });

    setDisableViewButtons((prevButtons) =>
      prevButtons.map((button, idx) => (idx === index ? true : button))
    );
    setTimeout(() => {
      if (link) {
        link.style.pointerEvents = "auto";
      }

      if (viewButton) {
        viewButton.style.pointerEvents = "auto";
      }
      setDisableViewButtons((prevButtons) =>
        prevButtons.map((button, idx) => (idx === index ? false : button))
      );
      setShowNotification(null);
    }, 0);
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
      <Team_D_HeaderV2 />
      <section className="TeamD_content">
        <section className="withSearchBar">
          <h1>Certificates</h1>
          <InputGroup expand="lg" size="sm" className="float-right">
            <Form.Control
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="success" id="button-addon2">
              <FiSearch className="TeamD_icon search_icon" />
            </Button>
          </InputGroup>
        </section>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        {pdfFileNames.length > 0 ? (
          pdfFileNames.map((pdfFile, index) => (
            <div
              className="certificate_thumbnail"
              key={index}
              onMouseEnter={() =>
                setOverlayVisibilities((prevVisibilities) =>
                  prevVisibilities.map((visibility, idx) =>
                    idx === index ? true : visibility
                  )
                )
              }
              onMouseLeave={() =>
                setOverlayVisibilities((prevVisibilities) =>
                  prevVisibilities.map((visibility, idx) =>
                    idx === index ? false : visibility
                  )
                )
              }
            >
              <div className="cert">
                {isMobile && thumbnails[index] ? (
                  <Link
                    to="/viewCert"
                    state={{
                      pdfName: pdfFile.certificate_file,
                      courseTitle: pdfFile.quizTaken.quiz.course.title,
                    }}
                    id={`viewLink_${index}`}
                  >
                    <div className="overlay"></div>
                    <img src={thumbnails[index]} alt="PDF Thumbnail" />
                  </Link>
                ) : !isMobile && thumbnails[index] ? (
                  <img src={thumbnails[index]} alt="PDF Thumbnail" />
                ) : (
                  <p>Loading thumbnail...</p>
                )}

                {!isMobile && (
                  <div
                    className={`overlay${
                      overlayVisibilities[index] ? " visible" : ""
                    }`}
                  >
                    {thumbnails[index] && (
                      <div className="buttons">
                        <Link
                          id={`viewLink_${index}`}
                          to="/viewCert"
                          state={{
                            pdfName: pdfFile.certificate_file,
                            courseTitle: pdfFile.quizTaken.quiz.course.title,
                          }}
                        >
                          <OverlayTrigger placement="top" overlay={viewTooltip}>
                            <button
                              id={`viewButton_${index}`}
                              className="view"
                              style={{
                                pointerEvents: overlayVisibilities[index]
                                  ? "auto"
                                  : "none",
                              }}
                              onClick={handleViewClick(index)}
                            >
                              <BiFileFind className="TeamD_icon view_icon" />
                            </button>
                          </OverlayTrigger>
                        </Link>
                        <OverlayTrigger
                          placement="top"
                          overlay={downloadTooltip}
                        >
                          <button
                            className="download"
                            style={{
                              pointerEvents: overlayVisibilities[index]
                                ? "auto"
                                : "none",
                            }}
                            onClick={handleDownloadClick(index)}
                            disabled={
                              !enableViewButtons[index] ||
                              disableDownloadButtons[index]
                            }
                          >
                            <MdOutlineFileDownload className="TeamD_icon download_icon" />
                          </button>
                        </OverlayTrigger>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p style={{textTransform: 'capitalize'}}>{pdfFile.quizTaken.quiz.course.title}</p>
            </div>
          ))
        ) : (
          <div className="no-certificates">
            <img src={NoCert} alt="No certificatin yet" /> No certificate available.
          </div>
        )}
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

export default Team_D_Content;
