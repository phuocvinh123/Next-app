package com.example.apinext.model;

import com.example.apinext.model.enums.EStatusEmail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "send_emails")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String toEmail;
    private String subject;
    @Column(columnDefinition = "LONGTEXT")
    private String body;
    @Enumerated(EnumType.STRING)
    private EStatusEmail statusEmail;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
    private int retryCount;

    public SendEmail(SendEmail sendEmail) {
        this.id = sendEmail.id;
        this.toEmail = sendEmail.toEmail;
        this.subject = sendEmail.subject;
        this.body = sendEmail.body;
        this.statusEmail = sendEmail.statusEmail;
        this.customer = sendEmail.customer;
        this.retryCount = sendEmail.retryCount;
    }
}
