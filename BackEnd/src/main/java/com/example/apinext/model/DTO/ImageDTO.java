package com.example.apinext.model.DTO;

import com.example.apinext.model.Color;
import com.example.apinext.model.Product;
import com.example.apinext.model.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private Long id;
    private String url;
    private Product product;
    private Color color;
    private List<Size> size;
}
