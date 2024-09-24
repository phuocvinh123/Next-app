package com.example.apinext.controller.api;

import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.service.sendEmail.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/sendEmail")
@CrossOrigin(origins = "*")
public class SendEmailApi {
    @Autowired
    private SendEmailService sendEmailService;

    @GetMapping
    public ResponseEntity<?> getAllSendEmail(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
       Page<SendEmail> sendEmail= sendEmailService.findAllPage(pageable);
        return new ResponseEntity<>(sendEmail,HttpStatus.OK);
    }

    @GetMapping("/{status}")
    public ResponseEntity<?> getAllSendEmailByStatus(@PathVariable String status , @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<SendEmail> sendEmailStatus = sendEmailService.PageAllByStatusEmail(EStatusEmail.valueOf(status),pageable);
        return new ResponseEntity<>(sendEmailStatus,HttpStatus.OK);
    }
}
