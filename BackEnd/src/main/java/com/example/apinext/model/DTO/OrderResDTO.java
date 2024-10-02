package com.example.apinext.model.DTO;

import com.example.apinext.model.Order;
import com.example.apinext.model.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResDTO {
    private Order order;
    private List<OrderDetail> orderDetail;
}
