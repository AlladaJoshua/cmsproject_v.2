import React, { useState } from "react";
import "../Css/verification.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Team_D_HeaderV2 from "./Team_D_HeaderV2";
import warningErr from "../assets/icons8-warning-96.png";

const Team_D_Verification = () => {
  const [code, setCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/certifications/verifyCertificate/${code}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setVerificationResult(null);
          setErrorMessage("No certificate found for the provided serial number.");
        } else {
          setVerificationResult(data);
          setErrorMessage(""); // Clear previous error message if any
        }
      } else {
        setVerificationResult(null);
        setErrorMessage("An error occurred while verifying the certificate. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setVerificationResult(null);
      setErrorMessage("An error occurred while verifying the certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Team_D_HeaderV2 />
      <section className="verification_container">
        <div className="verification_title">
          <span></span>
        </div>
        <div className="verification_search">
          <div className="left">
            <h2>Verify Course Certificate</h2>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter Serial Number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button variant="primary" className="verify" onClick={handleVerify} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          <div className="right">
            {verificationResult && verificationResult.length > 0 && (
              <>
                <div className="nameVerification">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder={verificationResult[0].quizTaken.users.full_name}
                    readOnly
                  />
                </div>
                <div className="serialVerification">
                  <Form.Label>Certificate Serial No. <AiFillSafetyCertificate className="icon"/></Form.Label>
                  <Form.Control
                      size="sm"
                      type="text"
                      placeholder={verificationResult[0].serial_no}
                      readOnly
                    />
                </div>
                <div className="serialVerification">
                  <Form.Label>Course Certified</Form.Label>
                  <Form.Control
                      size="sm"
                      type="text"
                      placeholder={verificationResult[0].quizTaken.quiz.course.title}
                      readOnly
                    />
                </div>
              </>
            )}
            {errorMessage && <div className="error-message"><img src={warningErr} alt="warningErr" />{errorMessage}</div>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team_D_Verification;
