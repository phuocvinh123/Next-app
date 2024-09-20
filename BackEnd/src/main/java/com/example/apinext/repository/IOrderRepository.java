package com.example.apinext.repository;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Order;
import com.example.apinext.model.enums.EStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order,String> {
    List<Order> findAllByCustomer_IdOrderByIdDesc(Long customer_id);
    List<Order> findAllByStatus(EStatus status);

}
