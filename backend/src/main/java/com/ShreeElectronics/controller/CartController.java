package com.ShreeElectronics.controller;
import com.ShreeElectronics.entity.Cart;
import com.ShreeElectronics.model.Product;
import com.ShreeElectronics.repository.CartRepository;
import com.ShreeElectronics.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestController @RequestMapping("/api/cart") @CrossOrigin(origins="http://localhost:3000")
public class CartController {
 private final CartRepository cartRepository; private final ProductRepository productRepository;
 public CartController(CartRepository c, ProductRepository p) { this.cartRepository=c; this.productRepository=p; }
 @PostMapping public Cart addToCart(@RequestBody Cart request) {
  if (request.getProductId()==null || request.getQuantity()==null || request.getQuantity()<1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Valid product and quantity required");
  Product product=productRepository.findById(request.getProductId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found"));
  if (product.getStock()==null || product.getStock()<request.getQuantity()) throw new ResponseStatusException(HttpStatus.CONFLICT,"Insufficient stock");
  Cart cart=new Cart(); cart.setProductId(product.getId()); cart.setProductName(product.getName()); cart.setPrice(product.getPrice()); cart.setQuantity(request.getQuantity());
  return cartRepository.save(cart);
 }
 @GetMapping public List<Cart> getCartItems(){return cartRepository.findAll();}
 @DeleteMapping("/{id}") public void deleteItem(@PathVariable Long id){cartRepository.deleteById(id);}
}
