package com.example.apinext.service.order;

import com.example.apinext.model.Cart;
import com.example.apinext.model.DTO.OrderDTO;
import com.example.apinext.model.Order;
import com.example.apinext.repository.IOrderRepository;
import com.example.apinext.service.cart.CartService;
import com.example.apinext.util.DateUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService implements IOrderService{
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Order order) {
    orderRepository.save(order);
    }

    @Override
    public void deleteById(Long id) {
    orderRepository.deleteById(String.valueOf(id));
    }

    @Override
    public List<Order> findAllByCustomer_Id(Long customer_id) {
        return orderRepository.findAllByCustomer_IdOrderByIdDesc(customer_id);
    }



}
