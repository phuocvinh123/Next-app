package com.example.apinext.controller.api;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.CustomerDTO;
import com.example.apinext.service.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerApi {
    @Autowired
    private CustomerService customerService;



    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long customerId){
        Customer customer =customerService.findById(customerId).get();
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCustomer(@RequestBody CustomerDTO customerDTO){
     Customer updateCustomer= customerService.updateCustomer(customerDTO);
        return new ResponseEntity<>(updateCustomer,HttpStatus.OK);
    }

}
