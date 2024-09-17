package com.example.apinext.repository;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Product;
import com.example.apinext.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICartRepository extends JpaRepository<Cart,String> {
    Cart findByUserAndProduct(User user, Product product);
    List<Cart> findAllByUser_Id(Long user_id);
    List<Cart> deleteAllByUser_Id(Long user_id);
}
