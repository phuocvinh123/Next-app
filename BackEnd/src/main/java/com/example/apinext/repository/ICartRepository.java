package com.example.apinext.repository;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Customer;
import com.example.apinext.model.Product;
import com.example.apinext.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICartRepository extends JpaRepository<Cart,String> {
    List<Cart> findAllByCustomer_Id(Long customer_id);
    Cart findByCustomerAndProduct(Customer customer, Product product);
    List<Cart> deleteAllByCustomer_Id(Long customer_id);
}
