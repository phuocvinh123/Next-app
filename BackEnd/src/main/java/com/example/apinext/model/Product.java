package com.example.apinext.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    List<Images> imagesList;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    List<Size> sizeList;

}
