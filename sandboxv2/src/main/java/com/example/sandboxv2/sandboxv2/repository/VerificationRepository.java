package com.example.sandboxv2.sandboxv2.repository;

// Importing necessary classes/interfaces for the VerificationRepository
import com.example.sandboxv2.sandboxv2.dto.VerificationResponse;
import com.example.sandboxv2.sandboxv2.entity.Certification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// JPA repository interface for Certification entity with Long as the primary key type
public interface VerificationRepository
  extends JpaRepository<Certification, Long> {
  // Custom query to retrieve verification details based on serial number
  @Query(
    "SELECT new com.example.sandboxv2.sandboxv2.dto.VerificationResponse(cr.serial_no, cr.quizTaken.quiz.course.title, cr.quizTaken.users.full_name) FROM Certification cr WHERE cr.serial_no = :serial_no"
  )
  List<VerificationResponse> findBySerialNumberWithDetails(
    @Param("serial_no") String serial_no
  );
}
