package com.example.apinext.util;

import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.service.sendEmail.SendEmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Component
public class EmailUtils {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SendEmailService sendEmailService;

    private final BlockingQueue<SendEmail> emailQueue = new LinkedBlockingQueue<>();

    @PostConstruct
    public void init() {
        new Thread(this::processEmailQueue).start();
        List<SendEmail> senders = sendEmailService.findAllByStatusEmail(EStatusEmail.waiting);
        for (SendEmail send : senders) {
            emailQueue.offer(send);
        }
    }

    public void sendEmail(SendEmail sendEmail) {
        SendEmail email = new SendEmail(sendEmail);
        emailQueue.offer(email);
    }

    private void processEmailQueue() {
        while (true) {
            try {
                SendEmail email = emailQueue.take();
                if(email.getRetryCount() >=3){
                    sendEmailService.updateStatusEmail(email.getId(),EStatusEmail.cancel);
                    System.err.println("Email gửi thất bại quá 3 lần, đã chuyển thành cancel: " + email.getToEmail());
                } else {
                    boolean success = sendEmailInternal(email);
                    if (success) {
                        sendEmailService.updateStatusEmail(email.getId(), EStatusEmail.sent);
                    } else {
                        email.setRetryCount(email.getRetryCount() + 1);
                        sendEmailService.updateRetryCount(email.getId(), email.getRetryCount());
                        System.out.println("Email gửi thất bại lần " + email.getRetryCount()+", tới email: " + email.getToEmail());
                        emailQueue.offer(email);
                    }
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }



    public boolean sendEmailInternal(SendEmail email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("zcarebooking@gmail.com");
            message.setTo(email.getToEmail());
            message.setText(email.getBody());
            message.setSubject(email.getSubject());
            mailSender.send(message);
            System.out.println("Gửi email thành công đến: " + email.getToEmail());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
