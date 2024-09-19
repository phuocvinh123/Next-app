package com.example.apinext.repository;

import com.example.apinext.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer,String> {
    Optional<Customer> getCustomerByUser_UsernameAndUser_Password(String user_username, String user_password);
    Optional<Customer> getCustomerByUser_Username(String email);
}
