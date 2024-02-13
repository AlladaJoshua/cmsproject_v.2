package com.example.sandboxv2.sandboxv2.services;

import com.example.sandboxv2.sandboxv2.dto.VerificationResponse;
import com.example.sandboxv2.sandboxv2.repository.VerificationRepository;
// Importing necessary classes/interfaces for the VerificationService
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Service class for handling verification-related business logic
@Service
public class VerificationService {

  // Autowiring VerificationRepository for data access
  @Autowired
  private VerificationRepository verificationRepository;

  // Method to retrieve verification details by serial number
  public List<VerificationResponse> getCertificationDetailsBySerialNumber(
    String serial_no
  ) {
    return verificationRepository.findBySerialNumberWithDetails(serial_no);
  }
}
