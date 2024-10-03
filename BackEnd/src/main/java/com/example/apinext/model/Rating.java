package com.example.apinext.model;

import com.example.apinext.model.enums.ERating;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer star;
    private String comment;
    private String createAt;
    private String repComment;
    @ManyToOne
    private Customer customer;
    @ManyToOne
    private Product product;
    @OneToMany(mappedBy = "rating")
    @JsonIgnore
    private List<ImageRating> imageRating;
    @Enumerated(EnumType.STRING)
    private ERating eRating;
    private int likes = 0;
    private boolean liked = false;
}
