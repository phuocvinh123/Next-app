package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.*;
import com.example.apinext.model.Rating;
import com.example.apinext.model.enums.EStatus;
import com.example.apinext.service.rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingApi {
  @Autowired
    private RatingService ratingService;

  @GetMapping()
  public ResponseEntity<?> getAllRating(){
    List<Rating> ratings= ratingService.findAll();
    return new ResponseEntity<>(ratings, HttpStatus.OK);
  }

  @GetMapping("/status/{status}")
  public ResponseEntity<?> getAllRatingByStatus(@PathVariable (required = false) String status){
    List<Rating> ratings;
    if (status == null || status.isEmpty()) {
      ratings = ratingService.findAll();
    } else {
      try {
        ratings = ratingService.findAllByStatus(status);
      } catch (IllegalArgumentException e) {
        return new ResponseEntity<>("Invalid status", HttpStatus.BAD_REQUEST);
      }
    }
    return new ResponseEntity<>(ratings, HttpStatus.OK);
  }

  @GetMapping("/{productId}")
  public ResponseEntity<?> getRatingByProductId(@PathVariable Long productId) {
    List<RatingResDto> ratings = ratingService.findAllRatingByProductIdAndEStatusRating(productId);
    return new ResponseEntity<>(ratings, HttpStatus.OK);
  }

  @PostMapping()
    public ResponseEntity<?> rating(@RequestBody RatingDto ratingDto) {
    ratingService.saveRating(ratingDto);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/like/{ratingId}")
  public ResponseEntity<LikeDto> likeRating(@PathVariable Long ratingId) {
    LikeDto likeDto = ratingService.like(ratingId);
    return new ResponseEntity<>(likeDto, HttpStatus.OK);
  }

  @GetMapping("/unlike/{ratingId}")
  public ResponseEntity<LikeDto> unlikeRating(@PathVariable Long ratingId) {
    LikeDto unlikeDto = ratingService.unlike(ratingId);
    return new ResponseEntity<>(unlikeDto, HttpStatus.OK);
  }

  @PutMapping("/repComment")
  public ResponseEntity<?> repComment (@RequestBody RepComment repComment){
    return new ResponseEntity<>(ratingService.setRepComment(repComment), HttpStatus.OK);
  }

  @PutMapping("/changeStatus")
  public ResponseEntity<?> changeStatus (@RequestBody ChangeStatusRating changeStatusRating){
    ratingService.changeStatusRating(changeStatusRating);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/showRating/{orderId}")
  public ResponseEntity<?> findByOrderId (@PathVariable Long orderId){
    ShowRatingDto dto =ratingService.findByOrderId(orderId).get();
    return new ResponseEntity<>(dto,HttpStatus.OK);
  }


}
