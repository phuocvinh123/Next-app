package com.example.apinext.service.sendEmail;

import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.service.IGeneralService;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ISendEmailService extends IGeneralService<SendEmail,Long> {
    List<SendEmail> findAllByStatusEmail(EStatusEmail statusEmail);
}
