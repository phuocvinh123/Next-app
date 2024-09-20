package com.example.apinext.service.user;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.RegisterDTO;
import com.example.apinext.model.User;
import com.example.apinext.model.enums.ERole;
import com.example.apinext.repository.IUserRepository;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.util.DateUtils;
import com.example.apinext.util.PasswordEncryptionUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private CustomerService customerService;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(String.valueOf(id));
    }

    @Override
    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Optional<Customer> register(RegisterDTO registerDTO) {
    User user = new User();
    user.setUsername(registerDTO.getName());
    user.setPassword(PasswordEncryptionUtil.encryptPassword(registerDTO.getPassword()));
    user.setRole(ERole.USER);
    userRepository.save(user);
    User userId = userRepository.findById(String.valueOf(user.getId())).get();
    Customer customer = new Customer();
    customer.setUser(userId);
    customer.setFullName(registerDTO.getName());
    customer.setEmail(registerDTO.getEmail());
    customer.setDate(DateUtils.parseDate(registerDTO.getDate()));
    customerService.save(customer);
    return Optional.of(customer);
    }
}
