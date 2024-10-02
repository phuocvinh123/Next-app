package com.example.apinext.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "image_ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String urlImage;
    private String urlVideo;
    @ManyToOne
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    private Rating rating;
}
