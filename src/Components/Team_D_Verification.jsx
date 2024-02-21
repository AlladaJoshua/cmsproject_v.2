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
  const [isValidSerial, setIsValidSerial] = useState(false);
  const defaultCodePrefix = "B55-";
  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/verifications/verifyCertificate/${code}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setVerificationResult(null);
          setErrorMessage(
            "Sorry, the serial number you entered does not exist in our system. Please check the serial number and try again."
          );
          setIsValidSerial(false);
        } else {
          setVerificationResult(data);
          setErrorMessage(""); // Clear previous error message if any
          setIsValidSerial(true);
        }
      } else {
        // Handle non-200 status codes
        if (response.status === 404) {
          setVerificationResult(null);
          setErrorMessage(
            "Sorry, the serial number you entered does not exist in our system. Please check the serial number and try again."
          );
          setIsValidSerial(false);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error verifying certificate:", error);
      setVerificationResult(null);
      setErrorMessage(
        "An error occurred while verifying the certificate. Please try again."
      );
      setIsValidSerial(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Team D header component */}
      <Team_D_HeaderV2 />
      <section className="verification_container">
        <div className="verification_title">
          <span></span>
        </div>
        <div className="verification_search">
          <div className="left">
            <h2>Verify Course Certificate</h2>
            {/* Serial number input field */}
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter Serial Number"
              value={code}
              onClick={() => {
                // Append "B55-" only if the input is empty or does not start with the default prefix
                if (!code || !code.startsWith(defaultCodePrefix)) {
                  setCode(defaultCodePrefix);
                  setIsValidSerial(false); // Reset isValidSerial on input click
                }
              }}
              onChange={(e) => {
                let inputValue = e.target.value.toUpperCase();
                // If the input does not start with the default prefix, prepend it
                if (!inputValue.startsWith(defaultCodePrefix)) {
                  inputValue = defaultCodePrefix;
                }
                // Limit to 18 characters after the prefix
                inputValue = inputValue.substring(
                  0,
                  defaultCodePrefix.length + 18
                );
                setCode(inputValue);
                setIsValidSerial(false); // Reset isValidSerial on input change
              }}
              onKeyDown={(e) => {
                // Prevent deletion of default prefix with the delete key
                if (e.key === "Backspace" && code === defaultCodePrefix) {
                  e.preventDefault();
                }
                if (e.key === "Delete" && code === defaultCodePrefix) {
                  e.preventDefault();
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "a") {
                  // Prevent the default action (select all) when Control (or Command on Mac) + A is pressed
                  e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // Handle the "Enter" key press, e.g., trigger the verification function
                  handleVerify();
                }
              }}
              onPaste={(e) => {
                // Prevent pasting into the input field
                e.preventDefault();
              }}
              style={{
                borderColor: isValidSerial
                  ? "#28a745"
                  : errorMessage
                  ? "#ff0000"
                  : "#ced4da",
                borderWidth: "1.5px", // Adjust the border width as needed
                color: isValidSerial
                  ? "#28a745"
                  : errorMessage
                  ? "#ff0000"
                  : "inherit", // Set font color to green when certified
              }}
            />

            {/* Verify button */}
            <Button
              variant="primary"
              className="verify"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <div className="right">
            {!loading && (
              <>
                {/* Render certificate information */}
                {!verificationResult && !errorMessage && (
                  <>
                    {/* Render input boxes if verificationResult doesn't exist */}
                    <div className="nameVerification">
                      <Form.Label>Name</Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>
                        Certificate Serial No.{" "}
                        <AiFillSafetyCertificate className="icon" />
                      </Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>Course Certified</Form.Label>
                      <Form.Control size="sm" type="text" readOnly />
                    </div>
                  </>
                )}
                {/* Render certificate information if verificationResult exists */}
                {verificationResult && verificationResult.length > 0 && (
                  <>
                    <div className="nameVerification">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={verificationResult[0].full_name}
                        readOnly
                      />
                    </div>
                    <div className="serialVerification">
                      <Form.Label>
                        Certificate Serial No.{" "}
                        <AiFillSafetyCertificate className="icon" />
                      </Form.Label>
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
                        placeholder={verificationResult[0].course_title}
                        readOnly
                      />
                    </div>
                  </>
                )}
                {/* Render error message if any */}
                {errorMessage && (
                  <div className="error-message">
                    <img src={warningErr} alt="warningErr" />
                    {errorMessage}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team_D_Verification;
