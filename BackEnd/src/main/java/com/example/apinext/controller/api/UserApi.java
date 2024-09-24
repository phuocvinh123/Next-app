package com.example.apinext.controller.api;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.LoginDTO;
import com.example.apinext.model.DTO.RegisterDTO;
import com.example.apinext.model.User;
import com.example.apinext.security.JwtUtil;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.user.UserService;
import com.example.apinext.util.PasswordEncryptionUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserApi {
    @Autowired
    private UserService userService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private JwtUtil jwtUtil;
    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;

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
        String accessToken = jwtUtil.generateAccessToken(customer);
        String refreshToken = jwtUtil.generateRefreshToken(customer);

        Map<String, Object> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        tokens.put("customer", customer);

        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> requestBody) {
        String accessToken = requestBody.get("refreshToken");
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(accessToken)
                    .getBody();

            String username = claims.getSubject();

            Customer customer = customerService.getCustomerByUser_Username(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String newAccessToken = jwtUtil.generateAccessToken(customer);

            Map<String, Object> tokens = new HashMap<>();
            tokens.put("accessToken", newAccessToken);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid access token", HttpStatus.UNAUTHORIZED);
        }
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
