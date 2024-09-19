package com.example.apinext.service.customer;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.CustomerDTO;
import com.example.apinext.service.IGeneralService;

import java.util.Optional;

public interface ICustomerService extends IGeneralService<Customer, Long> {
    Customer updateCustomer(CustomerDTO customerDto);
   Optional <Customer> getCustomerByUser_UsernameAndUser_Password(String user_username, String user_password);
    Optional<Customer> getCustomerByUser_Username(String email);
}
