package com.example.sandboxv2.sandboxv2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sandboxv2.sandboxv2.dto.VerificationResponse;
import com.example.sandboxv2.sandboxv2.repository.VerificationRepository;


@Service
public class VerificationService {
    @Autowired
    private VerificationRepository verificationRepository;

    public List<VerificationResponse> getCertificationDetailsBySerialNumber(String serial_no) {
        return verificationRepository.findBySerialNumberWithDetails(serial_no);
    }
}
