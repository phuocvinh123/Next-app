package com.example.apinext.util;

import com.example.apinext.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class EmailUtils {
    @Autowired
    private JavaMailSender mailSender;

    private final BlockingQueue<Email> emailQueue = new LinkedBlockingQueue<>();

    public EmailUtils() {
        new Thread(this::processEmailQueue).start();
    }

    public void sendEmail(String toEmail, String subject, String body) {
        Email email = new Email(toEmail, subject, body);
        emailQueue.offer(email);
    }

    private void processEmailQueue() {
        while (true) {
            try {
                Email email = emailQueue.take();
                sendEmailInternal(email);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }



    public  void sendEmailInternal(Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("zcarebooking@gmail.com");
        message.setTo(email.getToEmail());
        message.setText(email.getBody());
        message.setSubject(email.getSubject());
        mailSender.send(message);
        System.out.println("Gửi email thành công đến: " + email.getToEmail());
    }
}
