package com.example.apinext.service.order;

import com.example.apinext.model.DTO.OrderDTO;
import com.example.apinext.model.Order;
import com.example.apinext.service.IGeneralService;

import java.util.List;

public interface IOrderService extends IGeneralService<Order,Long> {
    List<Order> findAllByCustomer_Id(Long customer_id);
    void addOrder(OrderDTO orderDto);
}
