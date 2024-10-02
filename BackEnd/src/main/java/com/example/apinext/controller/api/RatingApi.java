package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.RatingDto;
import com.example.apinext.model.enums.ERating;
import com.example.apinext.service.rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingApi {
  @Autowired
    private RatingService ratingService;

  @GetMapping("/{productId}")
  public ResponseEntity<?> getRatingByProductId(@PathVariable Long productId) {
    return new ResponseEntity<>(ratingService.findAllRatingByProductIdAndEStatusRating(productId, "APPROVED"),HttpStatus.OK);
  }

  @PostMapping()
    public ResponseEntity<?> rating(@RequestBody RatingDto ratingDto) {
    ratingService.saveRating(ratingDto);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
