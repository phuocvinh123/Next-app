package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.ChangeStatusDTO;
import com.example.apinext.model.DTO.OrderDTO;
import com.example.apinext.model.Order;
import com.example.apinext.model.enums.EStatus;
import com.example.apinext.service.order.OrderService;
import com.example.apinext.util.EmailUtils;
import com.example.apinext.util.SendEmail;
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
    @Autowired
    private EmailUtils emailUtil;

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id){
        Order order = orderService.findById(id).get();
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getAllOrderByCustomerId(@PathVariable Long customerId){
        List<Order>orderList = orderService.findAllByCustomer_Id(customerId);
        return new ResponseEntity<>(orderList,HttpStatus.OK);
    }

    @PostMapping("/changeStatus")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeStatusDTO changeStatusDTO) {
        Order order = orderService.findById(changeStatusDTO.getOrderId()).get();
        order.setStatus(EStatus.valueOf(changeStatusDTO.getStatus()));
        orderService.save(order);
        if(order.getStatus() == EStatus.PAID){
            String title = "Đơn hàng của bạn đã được giao thành công";
            String body = SendEmail.DeliverySuccessful(order.getCustomer().getFullName());
            emailUtil.sendEmail(order.getCustomer().getEmail(), title, body);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
}
