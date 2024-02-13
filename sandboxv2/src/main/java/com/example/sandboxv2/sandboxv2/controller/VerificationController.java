package com.example.sandboxv2.sandboxv2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sandboxv2.sandboxv2.dto.VerificationResponse;
import com.example.sandboxv2.sandboxv2.services.VerificationService;


@RestController
@RequestMapping("/api/verifications")
@CrossOrigin("http://localhost:5173/")
public class VerificationController {
       @Autowired
    private VerificationService verificationService;
    
    @GetMapping("/verifyCertificate/{serial_no}")
public ResponseEntity<List<VerificationResponse>> verifyCertification(@PathVariable String serial_no) {
    List<VerificationResponse> verificationDetails = verificationService.getCertificationDetailsBySerialNumber(serial_no);

    if (!verificationDetails.isEmpty()) {
        return new ResponseEntity<>(verificationDetails, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

}
