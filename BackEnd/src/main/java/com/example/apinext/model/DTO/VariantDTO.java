package com.example.apinext.model.DTO;

import com.example.apinext.model.Variant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantDTO {
    private Variant variant;
    private List<ImageDTO> images;
    private List<ImageSizeDTO> imageSizes;
}
