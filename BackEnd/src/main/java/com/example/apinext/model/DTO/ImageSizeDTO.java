package com.example.apinext.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageSizeDTO {
    private Long id;
    private Long imageId;
    private String sizeName;
}
