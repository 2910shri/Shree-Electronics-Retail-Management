
package com.ShreeElectronics.repository;
import com.ShreeElectronics.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}