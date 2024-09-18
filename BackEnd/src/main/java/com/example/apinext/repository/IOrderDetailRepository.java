package com.example.apinext.repository;

import com.example.apinext.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail,String> {
    List<OrderDetail> getOrderDetailByOrder_Id(Long order_id);

}
