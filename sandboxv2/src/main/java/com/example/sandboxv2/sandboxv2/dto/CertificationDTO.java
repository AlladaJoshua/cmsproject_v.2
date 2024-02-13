package com.example.sandboxv2.sandboxv2.dto;

// Data Transfer Object (DTO) representing certification details
import java.sql.Date;

public class CertificationDTO {

  // Unique identifier for the certification
  private Long certificateID;

  // Unique serial number for the certification
  private String serial_no;

  // Date when the certification was issued
  private Date date_issued;

  // Time when the certification was issued
  private String time_issued;

  // File path or identifier for the certificate file
  private String certificate_file;

  // Criteria or details associated with the certification
  private String criteria;

  // ID of the associated QuizTaken entity
  private Long quiztken_ID;

  // Getter and Setter methods for certificateID
  public Long getCertificateID() {
    return this.certificateID;
  }

  public void setCertificateID(Long certificateID) {
    this.certificateID = certificateID;
  }

  // Getter and Setter methods for serial_no
  public String getSerial_no() {
    return this.serial_no;
  }

  public void setSerial_no(String serial_no) {
    this.serial_no = serial_no;
  }

  // Getter and Setter methods for date_issued
  public Date getDate_issued() {
    return this.date_issued;
  }

  public void setDate_issued(Date date_issued) {
    this.date_issued = date_issued;
  }

  // Getter and Setter methods for time_issued
  public String getTime_issued() {
    return this.time_issued;
  }

  public void setTime_issued(String time_issued) {
    this.time_issued = time_issued;
  }

  // Getter and Setter methods for certificate_file
  public String getCertificate_file() {
    return this.certificate_file;
  }

  public void setCertificate_file(String certificate_file) {
    this.certificate_file = certificate_file;
  }

  // Getter and Setter methods for criteria
  public String getCriteria() {
    return this.criteria;
  }

  public void setCriteria(String criteria) {
    this.criteria = criteria;
  }

  // Getter and Setter methods for quiztken_ID
  public Long getQuiztken_ID() {
    return this.quiztken_ID;
  }

  public void setQuiztken_ID(Long quiztken_ID) {
    this.quiztken_ID = quiztken_ID;
  }
}
