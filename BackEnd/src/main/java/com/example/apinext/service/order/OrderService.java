package com.example.apinext.service.order;

import com.example.apinext.model.Order;
import com.example.apinext.repository.IOrderRepository;
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
    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public void save(Order order) {
    orderRepository.save(order);
    }

    @Override
    public void deleteById(Long id) {
    orderRepository.deleteById(id);
    }

    @Override
    public List<Order> findAllByUser_Id(Long user_id) {
        return orderRepository.findAllByUser_Id(user_id);
    }

    @Override
    public List<Order> saveAllByUser_Id(Long user_id) {
        return orderRepository.saveAllByUser_Id(user_id);
    }
}
