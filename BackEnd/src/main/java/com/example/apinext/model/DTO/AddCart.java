package com.example.apinext.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddCart {
    private Long Color;
    private Long customerId;
    private String date;
    private Long productId;
    private Long imageId;
    private int quantity;
    private String size;
}
