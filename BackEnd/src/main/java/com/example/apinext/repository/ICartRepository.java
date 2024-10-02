package com.example.apinext.repository;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Color;
import com.example.apinext.model.Customer;
import com.example.apinext.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ICartRepository extends JpaRepository<Cart,String> {
    List<Cart> findAllByCustomer_Id(Long customer_id);
    Cart findByCustomerAndProductAndColor(Customer customer, Product product, Color color);
    List<Cart> deleteAllByCustomer_Id(Long customer_id);
}
