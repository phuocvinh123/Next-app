package com.example.apinext.controller.api;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.LoginDTO;
import com.example.apinext.model.DTO.RegisterDTO;
import com.example.apinext.model.User;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.user.UserService;
import com.example.apinext.util.PasswordEncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserApi {
    @Autowired
    private UserService userService;
    @Autowired
    private CustomerService customerService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userService.findById(id).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<Customer> customerOptional = customerService.getCustomerByUser_Username(loginDTO.getUsername());
        if (!customerOptional.isPresent()) {
            return new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        }
        Customer customer = customerOptional.get();
        String dbPassword = customer.getUser().getPassword();
        boolean isPasswordHashed = dbPassword.startsWith("$2a$");
        if (isPasswordHashed) {
            if (!PasswordEncryptionUtil.checkPassword(loginDTO.getPassword(), dbPassword)) {
                return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
            }
        } else {
            if (!loginDTO.getPassword().equals(dbPassword)) {
                return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
       Customer register =  userService.register(registerDTO).get();
        return new ResponseEntity<>(register,HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
