package com.ShreeElectronics.service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service @RequiredArgsConstructor
public class EmailService {
 private final JavaMailSender mailSender;
 @Value("${spring.mail.username:}") private String configuredSender;
 public void sendOrderConfirmation(String email,String customerName,String orderId) {
  if (email==null || email.isBlank() || configuredSender==null || configuredSender.isBlank()) return;
  try { SimpleMailMessage message=new SimpleMailMessage(); message.setTo(email); message.setSubject("Order Confirmation - Shree Electronics");
   message.setText("Dear "+customerName+",\n\nYour order has been placed successfully.\nOrder ID: "+orderId+"\n\nThank you for choosing Shree Electronics.");
   mailSender.send(message);
  } catch (Exception ex) { System.err.println("Order saved, but confirmation email could not be sent: "+ex.getMessage()); }
 }
}
