package com.example.apinext.service.orderDetail;

import com.example.apinext.model.DTO.OrderDetailDTO;
import com.example.apinext.model.Order;
import com.example.apinext.model.OrderDetail;
import com.example.apinext.service.IGeneralService;

import java.util.List;

public interface IOrderDetailService extends IGeneralService<OrderDetail,Long> {
    List<OrderDetail> getOrderDetailByOrder_Id(Long order_id);
    Order addOrderDetail(OrderDetailDTO orderDetailDto);
}
