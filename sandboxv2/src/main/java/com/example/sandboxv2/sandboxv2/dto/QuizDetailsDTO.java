package com.example.sandboxv2.sandboxv2.dto;

import java.sql.Date;

public class QuizDetailsDTO {

  private Long courseID;
  private String courseTitle;
  private Date courseStartDate;
  private String instructorFullName;
  private String userFullName;
  private Long userID;
  private Long targetScore;
  private Long quizScore;
  private Long quiztknID;


    public Long getCourseID() {
        return this.courseID;
    }

    public void setCourseID(Long courseID) {
        this.courseID = courseID;
    }

    public String getCourseTitle() {
        return this.courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public Date getCourseStartDate() {
        return this.courseStartDate;
    }

    public void setCourseStartDate(Date courseStartDate) {
        this.courseStartDate = courseStartDate;
    }

    public String getInstructorFullName() {
        return this.instructorFullName;
    }

    public void setInstructorFullName(String instructorFullName) {
        this.instructorFullName = instructorFullName;
    }

    public String getUserFullName() {
        return this.userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public Long getUserID() {
        return this.userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getTargetScore() {
        return this.targetScore;
    }

    public void setTargetScore(Long targetScore) {
        this.targetScore = targetScore;
    }

    public Long getQuizScore() {
        return this.quizScore;
    }

    public void setQuizScore(Long quizScore) {
        this.quizScore = quizScore;
    }

    public Long getQuiztknID() {
        return this.quiztknID;
    }

    public void setQuiztknID(Long quiztknID) {
        this.quiztknID = quiztknID;
    }
 
  public QuizDetailsDTO(
    Long courseID,
    String courseTitle,
    Date courseStartDate,
    String instructorFullName,
    String userFullName,
    Long userID,
    Long targetScore,
    Long quizScore,
    Long quiztknID
  ) {
    this.courseID = courseID;
    this.courseTitle = courseTitle;
    this.courseStartDate = courseStartDate;
    this.instructorFullName = instructorFullName;
    this.userFullName = userFullName;
    this.userID = userID;
    this.targetScore = targetScore;
    this.quizScore = quizScore;
    this.quiztknID = quiztknID;
  }
  // getters and setters
}
