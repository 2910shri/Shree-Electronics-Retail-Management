package com.ShreeElectronics.controller;
import com.ShreeElectronics.model.Repair;
import com.ShreeElectronics.repository.RepairRepository;
import com.ShreeElectronics.service.SmsService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/repairs") @CrossOrigin(origins="http://localhost:3000")
public class RepairController {
 private final RepairRepository repository; private final SmsService smsService;
 public RepairController(RepairRepository repository,SmsService smsService){this.repository=repository;this.smsService=smsService;}
 @GetMapping public List<Repair> getAllRepairs(){return repository.findAll();}
 @PostMapping public Repair addRepair(@RequestBody Repair repair){
  if(blank(repair.getCustomerName())||blank(repair.getProductName())||blank(repair.getMobileNumber())) throw new IllegalArgumentException("Customer, product and mobile are required");
  repair.setStatus("Pending"); return repository.save(repair);
 }
 @PutMapping("/{id}") public Repair updateStatus(@PathVariable Long id,@RequestBody Repair request){
  Repair existing=repository.findById(id).orElseThrow(()->new IllegalArgumentException("Repair not found"));
  boolean newlyCompleted=!"Completed".equalsIgnoreCase(existing.getStatus()) && "Completed".equalsIgnoreCase(request.getStatus());
  existing.setStatus(request.getStatus()); Repair saved=repository.save(existing);
  if(newlyCompleted) { try { smsService.sendSms(saved.getMobileNumber(),"Your repair is completed. Please collect it from Shree Electronics, Kadegaon."); } catch(Exception ex){System.err.println("Repair updated but SMS failed: "+ex.getMessage());} }
  return saved;
 }
 @DeleteMapping("/{id}") public void deleteRepair(@PathVariable Long id){repository.deleteById(id);}
 private boolean blank(String s){return s==null||s.isBlank();}
}
