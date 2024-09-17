package com.example.apinext.service.user;

import com.example.apinext.model.User;
import com.example.apinext.service.IGeneralService;

import java.util.Optional;

public interface IUserService extends IGeneralService<User,Long> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}
