package com.example.apinext.repository;

import com.example.apinext.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IUserRepository extends JpaRepository<User,String> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}
