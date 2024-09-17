package com.example.apinext.controller.api;

import com.example.apinext.model.Order;
import com.example.apinext.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderApi {
    @Autowired
    private OrderService orderService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllOrderByUssrId(@RequestParam Long userId){
        List<Order> orderList = orderService.findAllByUser_Id(userId);
        return new  ResponseEntity<>(orderList,HttpStatus.OK);
    }
}
