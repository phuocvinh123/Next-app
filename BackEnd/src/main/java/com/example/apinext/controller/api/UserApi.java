package com.example.apinext.controller.api;

import com.example.apinext.model.User;
import com.example.apinext.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserApi {
    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userService.findById(id).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
       User Login =  userService.findByUsernameAndPassword(user.getUsername(), user.getPassword()).orElse(null);
        return new ResponseEntity<>(Login,HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
