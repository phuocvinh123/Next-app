package com.example.apinext.service.orderDetail;

import com.example.apinext.model.*;
import com.example.apinext.model.DTO.OrderDetailDTO;
import com.example.apinext.model.enums.EStatus;
import com.example.apinext.model.enums.EStatusEmail;
import com.example.apinext.repository.IOrderDetailRepository;
import com.example.apinext.service.cart.CartService;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.order.OrderService;
import com.example.apinext.service.sendEmail.SendEmailService;
import com.example.apinext.service.stock.StockService;
import com.example.apinext.util.DateUtils;
import com.example.apinext.util.EmailUtils;
import com.example.apinext.util.SentEmail;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class OrderDetailService implements IOrderDetailService{
    @Autowired
    @Lazy
    private IOrderDetailRepository orderDetailRepository;
    @Autowired
    @Lazy
    private OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private EmailUtils emailUtil;
    @Autowired
    private SendEmailService sendEmailService;
    @Autowired
    private StockService stockService;
    @Override
    public List<OrderDetail> findAll() {
        return orderDetailRepository.findAll();
    }

    @Override
    public Optional<OrderDetail> findById(Long id) {
        return orderDetailRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(OrderDetail orderDetail) {
    orderDetailRepository.save(orderDetail);
    }

    @Override
    public void deleteById(Long id) {
    orderDetailRepository.deleteById(String.valueOf(id));
    }

    @Override
    public List<OrderDetail> getOrderDetailByOrder_Id(Long order_id) {
        return orderDetailRepository.getOrderDetailByOrder_Id(order_id);
    }

    @Override
    public Order addOrderDetail(OrderDetailDTO orderDetailDto) {
    List<Cart> cartList = cartService.getCartCustomerId(orderDetailDto.getCustomerId());
        Order order = new Order();
        int quantity = 0;
    for (Cart cart : cartList) {
        quantity += cart.getQuantity();
    }
    order.setCustomer(customerService.findById(orderDetailDto.getCustomerId()).get());
    order.setDate(DateUtils.convertStringToLocalDate(orderDetailDto.getDate()));
    order.setTotalProduct(quantity);
    order.setStatus(EStatus.CONFIRMING);
    order.setSubTotal(orderDetailDto.getSubTotal());
    orderService.save(order);
    Order idOrder = orderService.findById(order.getId()).get();
        for (Cart cart : cartList) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(cart.getProduct());
            orderDetail.setQuantity(cart.getQuantity());
            orderDetail.setTotalPrice(BigDecimal.valueOf(cart.getImage().getPrice() * cart.getQuantity()));
            orderDetail.setOrder(idOrder);
            orderDetail.setColor(cart.getColor());
            orderDetail.setSize(cart.getSize());
            orderDetail.setImage(cart.getImage());
            Stock stock = stockService.findById(cart.getImage().getStock().getId()).get();
            stock.setQuantity(stock.getQuantity() - cart.getQuantity());
            stockService.save(stock);
            orderDetailRepository.save(orderDetail);
        }
    cartService.deleteAllByCustomer_Id(orderDetailDto.getCustomerId());
        String title = "Đơn hàng đã đặt thành công";
        String body = SentEmail.OrderSuccessful(order.getCustomer().getFullName(),order.getDate(),order.getTotalProduct(),order.getSubTotal());
        SendEmail sendEmail = sendEmailService.saveEmail(order.getCustomer().getEmail(), title,body,order.getCustomer());
        emailUtil.sendEmail(sendEmail);
        return idOrder;
    }
}
