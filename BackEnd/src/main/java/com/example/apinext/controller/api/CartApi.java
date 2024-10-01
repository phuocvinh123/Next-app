package com.example.apinext.controller.api;

import com.example.apinext.model.Cart;
import com.example.apinext.model.DTO.AddCart;
import com.example.apinext.model.DTO.CartDTO;
import com.example.apinext.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "*")
public class CartApi {
    @Autowired
    private CartService cartService;

    @PostMapping("/addCart")
    public ResponseEntity<?> addCart(@RequestBody CartDTO CartDTO) {
        cartService.createCart(CartDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllCartByCustomerId(@PathVariable Long userId) {
        List<Cart> cart = cartService.getCartCustomerId(userId);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/minus/{cartId}")
    public ResponseEntity<?> minusCartById(@PathVariable Long cartId) {
        Cart cart = cartService.findById(cartId).get();
        if(cart.getQuantity() > 1){
            cart.setQuantity(cart.getQuantity()- 1);
            cartService.save(cart);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Quantity cannot be less than 1", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/plus/{cartId}")
    public ResponseEntity<?> plusCartById(@PathVariable Long cartId) {
        Cart cart = cartService.findById(cartId).get();
            cart.setQuantity(cart.getQuantity()+ 1);
            cartService.save(cart);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping ("/delete/{cartId}")
    public ResponseEntity<?> deleteCartById(@PathVariable Long cartId) {
        cartService.deleteById(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody AddCart addCart){
        Cart addToCart =cartService.addToCart(addCart);
        return new ResponseEntity<>(addToCart, HttpStatus.OK);
    }
}
