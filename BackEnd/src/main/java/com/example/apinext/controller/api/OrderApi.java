package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.ChangeStatusDTO;
import com.example.apinext.model.Order;
import com.example.apinext.model.Product;
import com.example.apinext.model.SendEmail;
import com.example.apinext.model.enums.EStatus;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.service.order.OrderService;
import com.example.apinext.service.sendEmail.SendEmailService;
import com.example.apinext.util.EmailUtils;
import com.example.apinext.util.SentEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderApi {
    @Autowired
    private OrderService orderService;
    @Autowired
    private EmailUtils emailUtil;
    @Autowired
    private SendEmailService sendEmailService;

    @GetMapping({ "/status/{status}"})
    public ResponseEntity<?> getOrderByStatus(@PathVariable(required = false) String status) {
        List<Order> orders;
        if (status == null || status.isEmpty()) {
            orders = orderService.findAll();
        } else {
            try {
                orders = orderService.findAllByStatus(EStatus.valueOf(status));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Invalid status", HttpStatus.BAD_REQUEST);
            }
        }
        Collections.reverse(orders);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

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

    @GetMapping()
    public ResponseEntity<?> getAllOrder(){
        List<Order> order = orderService.findAll();
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAllEmailByStatus(){
        List<SendEmail> email = sendEmailService.findAllByStatusEmail(EStatusEmail.waiting);
        return new ResponseEntity<>(email,HttpStatus.OK);
    }


    @PostMapping("/changeStatus")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeStatusDTO changeStatusDTO) {
        Order order = orderService.findById(changeStatusDTO.getOrderId()).get();
        order.setStatus(EStatus.valueOf(changeStatusDTO.getStatus()));
        orderService.save(order);
        if(order.getStatus() == EStatus.PAID){
            String title = "Đơn hàng của bạn đã được giao thành công";
            String body = SentEmail.DeliverySuccessful(order.getCustomer().getFullName());
            SendEmail sendEmail = sendEmailService.saveEmail(order.getCustomer().getEmail(), title,body,order.getCustomer());
            emailUtil.sendEmail(sendEmail);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
}
