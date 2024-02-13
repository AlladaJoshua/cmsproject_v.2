package com.example.sandboxv2.sandboxv2.controller;

import com.example.sandboxv2.sandboxv2.dto.VerificationResponse;
import com.example.sandboxv2.sandboxv2.services.VerificationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// REST controller for Certification verification
@RestController
@RequestMapping("/api/verifications")
@CrossOrigin("http://localhost:5173/")
public class VerificationController {

  // Inject the VerificationService for handling verification logic
  @Autowired
  private VerificationService verificationService;

  // Endpoint to verify a certification by its serial number
  @GetMapping("/verifyCertificate/{serial_no}")
  public ResponseEntity<List<VerificationResponse>> verifyCertification(
    @PathVariable String serial_no
  ) {
    // Retrieve certification details based on the serial number using VerificationService
    List<VerificationResponse> verificationDetails = verificationService.getCertificationDetailsBySerialNumber(
      serial_no
    );

    if (!verificationDetails.isEmpty()) {
      // Return details if found with HTTP status OK
      return new ResponseEntity<>(verificationDetails, HttpStatus.OK);
    } else {
      // Return NOT_FOUND if no details found
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
