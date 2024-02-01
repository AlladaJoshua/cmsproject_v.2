package com.example.sandboxv2.sandboxv2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.sandboxv2.sandboxv2.dto.QuizDetailsDTO;
import com.example.sandboxv2.sandboxv2.entity.QuizTaken;

public interface QuizTakenRepository extends JpaRepository<QuizTaken, Long> {
    List<QuizTaken> findAll();
    Optional<QuizTaken> findById(Long quiztknID);

    @Query("SELECT qt FROM QuizTaken qt WHERE qt.users.userID = :user_ID")
    List<QuizTaken> findByUserId(@Param("user_ID") Long user_ID);

        @Query(
        "SELECT new com.example.sandboxv2.sandboxv2.dto.QuizDetailsDTO(" +
        "qt.quiz.course.courseID, " +
        "qt.quiz.course.title, " +
        "qt.quiz.course.start_date, " +
        "qt.quiz.course.instructor.full_name, " +
        "qt.users.full_name, " +
        "qt.users.userID, " +
        "qt.quiz.target_score, " +
        "qt.quiz_score, " +
        "qt.quiztknID) " +
        "FROM QuizTaken qt " +
        "WHERE qt.quiztknID = :quiztknID")
    List<QuizDetailsDTO> findQuizDetailsByQuizTakenId(@Param("quiztknID") Long quiztknID);
}
