package com.example.apinext.service.customer;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.CustomerDTO;
import com.example.apinext.repository.ICustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CustomerService implements ICustomerService{
    @Autowired
    private ICustomerRepository customerRepository;
    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Customer customer) {
    customerRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
    customerRepository.deleteById(String.valueOf(id));
    }

    @Override
    public Customer updateCustomer(CustomerDTO customerDto) {
        Customer customer = customerRepository.findById(String.valueOf(customerDto.getCustomerId())).get();
        customer.setEmail(customer.getEmail());
        customer.setDate(customer.getDate());
        customer.setPhone(customerDto.getPhone());
        customer.setUser(customer.getUser());
        customer.setAddress(customerDto.getAddress());
        customer.setFullName(customerDto.getFullName());
        customerRepository.save(customer);
        return customer;
    }

    @Override
    public Optional<Customer> getCustomerByUser_UsernameAndUser_Password(String user_username, String user_password) {
        return customerRepository.getCustomerByUser_UsernameAndUser_Password(user_username, user_password);
    }

    @Override
    public Optional<Customer> getCustomerByUser_Username(String email) {
        return customerRepository.getCustomerByUser_Username(email);
    }
}
