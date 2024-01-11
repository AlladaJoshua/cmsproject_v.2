import React, { useState, useEffect } from "react";
import "../Css/content.css";
import cert from "../assets/cert.png";
import { pdfjs } from "react-pdf";
import { Alert } from "react-bootstrap";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Content = ({ pdfPath }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);

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

  const handleDownloadClick = () => {
    if (disableDownloadButton) {
      return; // Do nothing if the button is disabled
    }

    // Trigger the download
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Certificate.pdf";
    link.click();

    // Show the notification
    setShowNotification(true);

    // Disable the button for a specified duration (e.g., 5 seconds)
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
    }, 5000); // 5000 milliseconds (adjust as needed)
  };

  return (
    <div>
      <section className="content">
        <h1>Certifications</h1>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        <div className="cert">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="PDF Thumbnail" />
          ) : (
            <p>Loading thumbnail...</p>
          )}
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
              <button className="view">
                <BiFileFind className="icon view_icon" />
              </button>
              <button
                className="download"
                onClick={handleDownloadClick}
                disabled={disableDownloadButton}
              >
                <MdOutlineFileDownload className="icon download_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="cert">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="PDF Thumbnail" />
          ) : (
            <p>Loading thumbnail...</p>
          )}
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
            <button className="view">
                <BiFileFind className="icon view_icon" />
              </button>
              <button
                className="download"
                onClick={handleDownloadClick}
                disabled={disableDownloadButton}
              >
                <MdOutlineFileDownload className="icon download_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="cert">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="PDF Thumbnail" />
          ) : (
            <p>Loading thumbnail...</p>
          )}
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
            <button className="view">
                <BiFileFind className="icon view_icon" />
              </button>
              <button
                className="download"
                onClick={handleDownloadClick}
                disabled={disableDownloadButton}
              >
                <MdOutlineFileDownload className="icon download_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="cert">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="PDF Thumbnail" />
          ) : (
            <p>Loading thumbnail...</p>
          )}
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
            <button className="view">
                <BiFileFind className="icon view_icon" />
              </button>
              <button
                className="download"
                onClick={handleDownloadClick}
                disabled={disableDownloadButton}
              >
                <MdOutlineFileDownload className="icon download_icon" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {showNotification && (
        <Alert
          variant="success"
          onClose={() => setShowNotification(false)}
          dismissible
          style={{
            position: "fixed",
            top: "10px", // Adjust the top position as needed
            right: "10px", // Adjust the right position as needed
            zIndex: 1000, // Ensure the alert appears above other elements
          }}
        >
          Download successful!
        </Alert>
      )}
    </div>
  );
};

export default Content;
