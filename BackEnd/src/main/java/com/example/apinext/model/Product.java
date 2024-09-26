package com.example.apinext.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Float price;
    private String category;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String Image;
    @OneToOne
    @JoinColumn(name="discount_id")
    private Discount discount;

}
