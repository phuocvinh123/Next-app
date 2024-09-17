package com.example.apinext.service.cart;

import com.example.apinext.model.Cart;
import com.example.apinext.model.DTO.CartDTO;
import com.example.apinext.model.Product;
import com.example.apinext.model.User;
import com.example.apinext.service.IGeneralService;

import java.util.List;
import java.util.Optional;

public interface ICartService extends IGeneralService<Cart,Long> {
    void createCart(CartDTO CartDTO);
    Cart findByUserAndProduct(User user, Product product);
    List<Cart> getCartUserId(Long userId);
    List<Cart> deleteAllByUser_Id(Long user_id);
}
