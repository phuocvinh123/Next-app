package com.example.apinext.repository;

import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatusEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISendEmailRepository extends JpaRepository<SendEmail,String> {
    List<SendEmail> findAllByStatusEmail(EStatusEmail statusEmail);
}
