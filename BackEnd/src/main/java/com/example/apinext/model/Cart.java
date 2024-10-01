package com.example.apinext.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.time.LocalDate;


@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    private int quantity;
    @OneToOne
    @JoinColumn(name="color_id")
    private Color color;
    private String size;
    @OneToOne
    @JoinColumn(name="image_id")
    private Images image;
}
