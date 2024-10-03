package com.example.apinext.model.DTO;

import com.example.apinext.model.ImageRating;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingResDto {
    private Long id;
    private Integer star;
    private String comment;
    private String createAt;
    private String repComment;
    private String fullName;
    private int likes;
    private boolean liked;
    private List<ImageRating> imageRatings;
}
