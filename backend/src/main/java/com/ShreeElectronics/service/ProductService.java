package com.ShreeElectronics.service;
import com.ShreeElectronics.model.Product;
import com.ShreeElectronics.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductService {
 private final ProductRepository repository;
 public ProductService(ProductRepository repository){this.repository=repository;}
 public List<Product> getAllProducts(){return repository.findAll();}
 public List<Product> getLowStockProducts(int threshold){return repository.findAll().stream().filter(p->p.getStock()!=null && p.getStock()<=threshold).toList();}
 public Product addProduct(Product p){validate(p); p.setId(null); return repository.save(p);}
 public void deleteProduct(Long id){if(!repository.existsById(id)) throw new IllegalArgumentException("Product not found"); repository.deleteById(id);}
 public Product updateProduct(Long id,Product updated){validate(updated); Product p=repository.findById(id).orElseThrow(()->new IllegalArgumentException("Product not found"));
  p.setName(updated.getName().trim()); p.setCategory(updated.getCategory().trim()); p.setPrice(updated.getPrice()); p.setStock(updated.getStock()); p.setDescription(updated.getDescription()); return repository.save(p);}
 private void validate(Product p){if(p.getName()==null||p.getName().isBlank()) throw new IllegalArgumentException("Product name is required");
  if(p.getCategory()==null||p.getCategory().isBlank()) throw new IllegalArgumentException("Category is required");
  if(p.getPrice()==null||p.getPrice()<=0) throw new IllegalArgumentException("Price must be greater than zero");
  if(p.getStock()==null||p.getStock()<0) throw new IllegalArgumentException("Stock cannot be negative");}
}
