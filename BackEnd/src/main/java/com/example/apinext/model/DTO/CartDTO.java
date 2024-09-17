package com.example.apinext.model.DTO;

import com.example.apinext.model.Cart;
import com.example.apinext.model.Product;
import com.example.apinext.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long userId;
    private String date;
    private Long ProductId;
}
