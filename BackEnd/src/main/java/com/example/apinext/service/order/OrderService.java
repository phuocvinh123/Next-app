package com.example.apinext.service.order;

import com.example.apinext.model.DTO.OrderResDTO;
import com.example.apinext.model.Order;
import com.example.apinext.model.OrderDetail;
import com.example.apinext.model.enums.EStatus;
import com.example.apinext.repository.IOrderRepository;
import com.example.apinext.service.cart.CartService;
import com.example.apinext.service.orderDetail.OrderDetailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService implements IOrderService{
    @Autowired
    @Lazy
    private IOrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    @Lazy
    private OrderDetailService orderDetailService;
    @Override
    public List<Order>findAll() {
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

    @Override
    public List<Order> findAllByStatus(EStatus status) {
        return orderRepository.findAllByStatus(status);
    }

    public List<OrderResDTO> getAllOrderResDTOs(Long customerId) {
        List<Order> orders = orderRepository.findAllByCustomer_IdOrderByIdDesc(customerId);
        List<OrderResDTO> orderResDTOs = new ArrayList<>();
        for (Order order : orders) {
            List<OrderDetail> orderDetails = orderDetailService.getOrderDetailByOrder_Id(order.getId());
            OrderResDTO orderResDTO = new OrderResDTO();
            orderResDTO.setOrder(order);
            orderResDTO.setOrderDetails(orderDetails);
            orderResDTOs.add(orderResDTO);
        }
        return orderResDTOs;
    }
}
