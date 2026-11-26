package com.ShreeElectronics.dto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
public record CheckoutRequest(@NotBlank String customerName, @Email @NotBlank String customerEmail,
 @Pattern(regexp="[0-9]{10}") String mobile, @NotBlank String addressLine, @NotBlank String city,
 @Pattern(regexp="[0-9]{6}") String pincode, @NotBlank String paymentMethod,
 @NotEmpty List<@Valid CheckoutItem> items) {
 public record CheckoutItem(@NotNull Long productId, @NotNull @Min(1) Integer quantity) {}
}
