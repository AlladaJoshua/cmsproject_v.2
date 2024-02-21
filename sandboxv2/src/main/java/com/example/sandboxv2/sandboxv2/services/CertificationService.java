package com.example.sandboxv2.sandboxv2.services;

// Importing necessary classes/interfaces for the CertificationService
import com.example.sandboxv2.sandboxv2.entity.Certification;
import com.example.sandboxv2.sandboxv2.repository.CertificationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Service class for handling Certification-related business logic
@Service
public class CertificationService {

  // Autowiring CertificationRepository for data access
  @Autowired
  private CertificationRepository certificationRepository;

  // Method to retrieve all certifications
  public List<Certification> getAllCertification() {
    return certificationRepository.findAll();
  }

  // Method to retrieve a certification by its ID
  public Certification getCertificationId(Long certificateID) {
    return certificationRepository.findById(certificateID).orElse(null);
  }

  // Method to retrieve certifications for a specific user
  public List<Certification> getCertificationByUserId(Long user_ID) {
    return certificationRepository.findByUserId(user_ID);
  }

  // Method to save a new certification
  public Certification savCertification(Certification certification) {
    return certificationRepository.save(certification);
  }

  // Method to delete a certification by its ID
  public void deleteCertification(Long certificateID) {
    certificationRepository.deleteById(certificateID);
  }

  public Certification getMostRecentCertificationForUser(Long userID) {
    return certificationRepository.findMostRecentCertificateByUser(userID);
  }

  public boolean existsByQuizTakenId(Long quizTakenId) {
    return certificationRepository.existsByQuizTakenQuiztknID(quizTakenId);
}
}
