package com.ShreeElectronics.controller;
import com.ShreeElectronics.model.Product;
import com.ShreeElectronics.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/products") @CrossOrigin(origins="http://localhost:3000")
public class ProductController {
 private final ProductService service;
 public ProductController(ProductService service){this.service=service;}
 @GetMapping public List<Product> getProducts(){return service.getAllProducts();}
 @GetMapping("/low-stock") public List<Product> lowStock(@RequestParam(defaultValue="5") int threshold){return service.getLowStockProducts(Math.max(0,threshold));}
 @PostMapping public Product addProduct(@RequestBody Product p){return service.addProduct(p);}
 @DeleteMapping("/{id}") public void deleteProduct(@PathVariable Long id){service.deleteProduct(id);}
 @PutMapping("/{id}") public Product updateProduct(@PathVariable Long id,@RequestBody Product p){return service.updateProduct(id,p);}
}
