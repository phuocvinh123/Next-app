package com.example.apinext.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingDto {
    private Long productId;
    private Long customerId;
    private Long orderId;
    private LocalDate date;
    private int Star;
    private String comment;
    private String imageUrl;
}
