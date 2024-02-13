package com.example.sandboxv2.sandboxv2.entity;

// Annotations for JPA (Java Persistence API) mapping
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.sql.Date;

// Entity class representing Certification details
@Entity
public class Certification {

  // Primary Key
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long certificateID;

  // Unique serial number for the certification
  private String serial_no;

  // Date when the certification was issued
  private Date date_issued;

  // Time when the certification was issued
  @Column(name = "time_issued")
  private String time_issued;

  // File path or identifier for the certificate file
  private String certificate_file;

  // Criteria or details associated with the certification
  private String criteria;

  // Many-to-One relationship with QuizTaken entity
  @ManyToOne
  @JoinColumn(name = "quiztkn_id")
  private QuizTaken quizTaken;

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
    return time_issued;
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

  // Getter and Setter methods for quizTaken
  public QuizTaken getQuizTaken() {
    return this.quizTaken;
  }

  public void setQuizTaken(QuizTaken quizTaken) {
    this.quizTaken = quizTaken;
  }
}
