package com.example.apinext.repository;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByUser_Id(Long user_id);
    List<Order> saveAllByUser_Id(Long user_id);
}
