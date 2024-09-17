package com.example.apinext.service.customer;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.CustomerDTO;
import com.example.apinext.service.IGeneralService;

public interface ICustomerService extends IGeneralService<Customer, Long> {
    Customer updateCustomer(CustomerDTO customerDto);
}
