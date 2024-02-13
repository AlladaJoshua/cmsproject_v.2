package com.example.sandboxv2.sandboxv2.dto;

// Data Transfer Object (DTO) representing a response for certification verification
public class VerificationResponse {

  // Title of the course associated with the verification response
  private String course_title;

  // Serial number used for verification
  private String serial_no;

  // Full name associated with the verification response
  private String full_name;

  // Default constructor for the VerificationResponse DTO
  public VerificationResponse(
    String serial_no,
    String course_title,
    String full_name
  ) {
    this.serial_no = serial_no;
    this.course_title = course_title;
    this.full_name = full_name;
  }

  // Getter and Setter methods for course_title
  public String getCourse_title() {
    return this.course_title;
  }

  public void setCourse_title(String course_title) {
    this.course_title = course_title;
  }

  // Getter and Setter methods for serial_no
  public String getSerial_no() {
    return this.serial_no;
  }

  public void setSerial_no(String serial_no) {
    this.serial_no = serial_no;
  }

  // Getter and Setter methods for full_name
  public String getFull_name() {
    return this.full_name;
  }

  public void setFull_name(String full_name) {
    this.full_name = full_name;
  }
}
