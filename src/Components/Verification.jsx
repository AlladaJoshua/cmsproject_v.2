import React from "react";
import Header from "./Header";
import "../Css/verification.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { AiFillSafetyCertificate } from "react-icons/ai";

const Verification = () => {
  return (
    <div>
      <Header />
      <section className="verification_container">
        <div className="verification_title">
          <h1>Verify your Certificate</h1>
        </div>
        <div className="verification_search">
          <h2>Verify Course Ceritifcate</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Type your Certificate Serial number"
          />
          <Button variant="primary" className="verify">
            Verify
          </Button>
        </div>
        <Table striped bordered className="verification_table">
          <thead>
            <tr>
              <th>Certificate Serial No.</th>
              <th>Full name</th>
              <th>Course Certified</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>20190141470</td>
                <td>Joshua Allada</td>
                <td>Java Programming</td>
            </tr>
            <tr>
                <td colSpan={3} className="result_verification"><b>Certified <AiFillSafetyCertificate /></b></td>
            </tr>
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default Verification;
