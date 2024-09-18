package com.example.apinext.service.cart;
import com.example.apinext.model.Cart;
import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.CartDTO;
import com.example.apinext.model.Product;
import com.example.apinext.repository.ICartRepository;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.product.ProductService;
import com.example.apinext.util.DateUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CartService implements ICartService{
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ProductService productService;
    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Cart cart) {
    cartRepository.save(cart);
    }

    @Override
    public void deleteById(Long id) {
    cartRepository.deleteById(String.valueOf(id));
    }

    public void createCart(CartDTO cartDTO) {
        Customer customer = customerService.findById(cartDTO.getCustomerId()).orElse(null);
        Product product = productService.findById(cartDTO.getProductId()).orElse(null);
        Cart existingCart = cartRepository.findByCustomerAndProduct(customer, product);
        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + 1);
            cartRepository.save(existingCart);
        } else {
            Cart cart = new Cart();
            cart.setCustomer(customer);
            cart.setDate(DateUtils.convertStringToLocalDate(cartDTO.getDate()));
            cart.setProduct(product);
            cart.setQuantity(1);
            cartRepository.save(cart);
        }
    }

    @Override
    public Cart findByCustomerAndProduct(Customer customer, Product product) {
        return cartRepository.findByCustomerAndProduct(customer, product);
    }

    @Override
    public List<Cart> getCartCustomerId(Long customerId) {
        return cartRepository.findAllByCustomer_Id(customerId);
    }

    @Override
    public List<Cart> deleteAllByCustomer_Id(Long customer_id) {
        return cartRepository.deleteAllByCustomer_Id(customer_id);
    }


}
