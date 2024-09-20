package com.example.apinext.service.sendEmail;

import com.example.apinext.model.Customer;
import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.repository.ISendEmailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SendEmailService implements ISendEmailService{
    @Autowired
    private ISendEmailRepository sendEmailRepository;
    @Override
    public List<SendEmail> findAll() {
        return sendEmailRepository.findAll();
    }

    @Override
    public Optional<SendEmail> findById(Long id) {
        return sendEmailRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(SendEmail sendEmail) {
        sendEmailRepository.save(sendEmail);
    }

    @Override
    public void deleteById(Long id) {
        sendEmailRepository.deleteById(String.valueOf(id));
    }

    public SendEmail saveEmail (String toEmail, String subject, String body, Customer customer){
        SendEmail sendEmail =new SendEmail();
        sendEmail.setToEmail(toEmail);
        sendEmail.setSubject(subject);
        sendEmail.setBody(body);
        sendEmail.setStatusEmail(EStatusEmail.waiting);
        sendEmail.setCustomer(customer);
        return sendEmailRepository.save(sendEmail);
    }

    public void updateStatusEmail (Long id ,EStatusEmail statusEmail){
        SendEmail sendEmail = sendEmailRepository.findById(String.valueOf(id)).get();
        sendEmail.setStatusEmail(statusEmail);
        sendEmailRepository.save(sendEmail);
    }

    public void updateRetryCount(Long id, int retryCount) {
        SendEmail email = sendEmailRepository.findById(String.valueOf(id)).get();
        email.setRetryCount(retryCount);
        sendEmailRepository.save(email);
    }

    @Override
    public List<SendEmail> findAllByStatusEmail(EStatusEmail statusEmail) {
        return sendEmailRepository.findAllByStatusEmail(statusEmail);
    }
}
