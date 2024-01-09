import React from "react";
import "../Css/content.css";
import cert from "../assets/cert.png";

const Content = () => {
  return (
    <div>
      <section className="content">
        <h1>Certification</h1>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        <div className="cert">
          <img src={cert} alt="certificate" />
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
              <button className="view">View</button>
              <button className="download">Dowload</button>
            </div>
          </div>
        </div>
        <div className="cert">
          <img src={cert} alt="certificate" />
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
              <button className="view">View</button>
              <button className="download">Dowload</button>
            </div>
          </div>
        </div>
        <div className="cert">
          <img src={cert} alt="certificate" />
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
              <button className="view">View</button>
              <button className="download">Dowload</button>
            </div>
          </div>
        </div>
        <div className="cert">
          <img src={cert} alt="certificate" />
          <p>Course Title</p>
          <div className="overlay">
            <div className="buttons">
              <button className="view">View</button>
              <button className="download">Dowload</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
