package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.OrderDTO;
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

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getAllOrderByCustomerId(@PathVariable Long customerId){
        List<Order>orderList = orderService.findAllByCustomer_Id(customerId);
        return new ResponseEntity<>(orderList,HttpStatus.OK);
    }

    @PostMapping("/orderNow")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDto){
        orderService.addOrder(orderDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
