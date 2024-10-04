package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.OrderDetailDTO;
import com.example.apinext.model.Order;
import com.example.apinext.model.OrderDetail;
import com.example.apinext.service.orderDetail.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderDetails")
@CrossOrigin(origins = "*")
public class OrderDetailApi {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetailsByOrderId(@PathVariable Long orderId){
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailByOrder_Id(orderId);
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @PostMapping("/addOrderDetails")
    public ResponseEntity<?> addOrderDetails (@RequestBody OrderDetailDTO orderDetailDto){
       Order order= orderDetailService.addOrderDetail(orderDetailDto);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

}
