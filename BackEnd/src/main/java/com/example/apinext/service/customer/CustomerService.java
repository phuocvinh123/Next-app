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
        customer.setDob(customer.getDob());
        customer.setPhone(customerDto.getPhone());
        customer.setUser(customer.getUser());
        customer.setAddress(customerDto.getAddress());
        customer.setFullName(customerDto.getFullName());
        customerRepository.save(customer);
        return customer;
    }
}
