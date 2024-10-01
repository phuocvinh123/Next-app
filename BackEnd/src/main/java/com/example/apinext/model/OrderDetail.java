package com.example.apinext.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id",nullable = false)
    private Order order;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id",nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name="color_id", referencedColumnName = "id",nullable = false)
    private Color color;
    private String size;
    @ManyToOne
    @JoinColumn(name="image_id", referencedColumnName = "id",nullable = false)
    private Images image;
    private Integer quantity;
    private BigDecimal totalPrice;
}
