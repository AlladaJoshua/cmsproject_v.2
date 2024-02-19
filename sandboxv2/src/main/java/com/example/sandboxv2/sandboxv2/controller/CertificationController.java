package com.example.sandboxv2.sandboxv2.controller;

// Import necessary classes from the Spring Framework and Java
import com.example.sandboxv2.sandboxv2.entity.Certification;
import com.example.sandboxv2.sandboxv2.entity.QuizTaken;
import com.example.sandboxv2.sandboxv2.services.CertificationService;
import com.example.sandboxv2.sandboxv2.services.QuizTakenService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// REST controller for Certification entity
@RestController
@RequestMapping("/api/certifications")
@CrossOrigin("http://localhost:5173/")
public class CertificationController {

  // Autowired annotation to inject CertificationService dependency
  @Autowired
  private CertificationService certificationService;

  // Autowired annotation to inject QuizTakenService dependency
  @Autowired
  private QuizTakenService quizTakenService; // Assuming you have QuizTakenService to retrieve QuizTaken

  // Endpoint to retrieve all certifications
  @GetMapping
  public List<Certification> getAllCertification() {
    return certificationService.getAllCertification();
  }

  // Endpoint to retrieve a certification by its ID
  @GetMapping("/{certificateID}")
  public Certification getCertificationById(@PathVariable Long certificateID) {
    return certificationService.getCertificationId(certificateID);
  }

  // Endpoint to retrieve certifications for a specific user
  @GetMapping("/myCertification/{user_ID}")
  public List<Certification> getCertificationByUserId(
      @PathVariable Long user_ID) {
    return certificationService.getCertificationByUserId(user_ID);
  }

  // Endpoint to save a new certification
  @PostMapping
  public ResponseEntity<String> saveCertification(
      @RequestParam("serial_no") String serial_no,
      @RequestParam("file") MultipartFile certificate_file,
      @RequestParam("date_issued") Date date_issued,
      @RequestParam("time_issued") String time_issued,
      @RequestParam("criteria") String criteria,
      @RequestParam("quiztkn_ID") Long quiztkn_ID) {
    if (certificate_file.isEmpty()) {
      return ResponseEntity.badRequest().body("File is empty");
    }

    try {
      // Save the certificate file to a specific path
      byte[] bytes = certificate_file.getBytes();
      String originalFilename = certificate_file.getOriginalFilename();
      String filenameWithoutPrefix = originalFilename.startsWith("PDF")
          ? originalFilename.substring(3)
          : originalFilename;
      Path path = Paths.get(
          "C:C:\\Users\\vsbu\\Documents\\GitHub\\cmsproject_v.21\\public\\PDF\\" +
              filenameWithoutPrefix);
      Files.write(path, bytes);

      // Retrieve the associated QuizTaken entity
      QuizTaken quizTaken = quizTakenService.getQuizTakenId(quiztkn_ID);
      if (quizTaken == null) {
        return ResponseEntity
            .badRequest()
            .body("QuizTaken not found with ID: " + quiztkn_ID);
      }

      // Create a new Certification entity and set its properties
      Certification certification = new Certification();
      certification.setSerial_no(serial_no);
      certification.setDate_issued(date_issued);
      certification.setTime_issued(time_issued);
      certification.setCertificate_file(filenameWithoutPrefix);
      certification.setCriteria(criteria);
      certification.setQuizTaken(quizTaken); // Set QuizTaken in Certification
      certificationService.savCertification(certification);

      return ResponseEntity.ok("Certificate saved successfully");
    } catch (IOException e) {
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Failed to save certificate: " + e.getMessage());
    }
  }

  // Endpoint to delete a certification by its ID
  @DeleteMapping("/{certificateID}")
  public void deleteCertification(@PathVariable Long certificateID) {
    certificationService.deleteCertification(certificateID);
  }

  // Endpoint to retrieve the most recent certificate for a specific user
  @GetMapping("/myRecentCertification/{user_ID}")
  public Certification getMostRecentCertificationForUser(@PathVariable Long user_ID) {
    return certificationService.getMostRecentCertificationForUser(user_ID);
  }
}
