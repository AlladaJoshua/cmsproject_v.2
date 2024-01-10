import React, { useState, useEffect } from "react";
import "../Css/content.css";
import cert from "../assets/cert.png";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const Content = ({ pdfPath }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

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
  return (
    <div>
      <section className="content">
        <h1>Certification</h1>
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
              <button className="view">View</button>
              <a href="./PDF/Sample.pdf" download="Certificate.pdf">
                <button className="download">Dowload</button>
              </a>
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
              <button className="view">View</button>
              <a href="./PDF/Sample.pdf" download="Certificate.pdf">
                <button className="download">Dowload</button>
              </a>
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
              <button className="view">View</button>
              <a href="./PDF/Sample.pdf" download="Certificate.pdf">
                <button className="download">Dowload</button>
              </a>
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
              <button className="view">View</button>
              <a href="./PDF/Sample.pdf" download="Certificate.pdf">
                <button className="download">Dowload</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
