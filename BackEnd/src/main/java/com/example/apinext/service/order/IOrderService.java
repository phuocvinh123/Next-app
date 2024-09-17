package com.example.apinext.service.order;

import com.example.apinext.model.Order;
import com.example.apinext.service.IGeneralService;

import java.util.List;

public interface IOrderService extends IGeneralService<Order,Long> {
    List<Order> findAllByUser_Id(Long user_id);
    List<Order> saveAllByUser_Id(Long user_id);
}
