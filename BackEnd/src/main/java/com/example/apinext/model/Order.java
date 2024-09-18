package com.example.apinext.model;

import com.example.apinext.model.enums.EStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Customer customer;
    private LocalDate date;
    private Integer totalProduct;
    private BigDecimal subTotal;
    @Enumerated(EnumType.STRING)
    private EStatus status;
    @OneToMany(mappedBy = "order")
    @JsonIgnore
    List<OrderDetail> orderDetails;
}
