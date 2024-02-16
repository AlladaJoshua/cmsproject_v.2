package com.example.sandboxv2.sandboxv2.repository;

// Importing necessary classes/interfaces for the CertificationRepository
import com.example.sandboxv2.sandboxv2.entity.Certification;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// JPA repository interface for Certification entity with Long as the primary key type
public interface CertificationRepository
    extends JpaRepository<Certification, Long> {
  // Method to retrieve all certifications
  List<Certification> findAll();

  // Method to retrieve a certification by its ID
  Optional<Certification> findById(Long certificateID);

  // Custom query to retrieve certifications based on user ID
  @Query("SELECT cr FROM Certification cr WHERE cr.quizTaken.users.userID = :user_ID")
  List<Certification> findByUserId(@Param("user_ID") Long user_ID);

  @Query(value = "SELECT * FROM certification cr WHERE cr.quiztkn_id IN " +
      "(SELECT qt.quiztknID FROM quiz_taken qt WHERE qt.user_ID = :user_ID) " +
      "ORDER BY cr.date_issued DESC, cr.time_issued DESC LIMIT 5", nativeQuery = true)
  Certification findMostRecentCertificateByUser(@Param("user_ID") Long userID);
}
