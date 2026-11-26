package com.ShreeElectronics.service;

import com.ShreeElectronics.model.Repair;
import com.ShreeElectronics.repository.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairService {

    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private SmsService smsService;

    // ✅ Get all repairs
    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    // ✅ Add new repair
    public Repair addRepair(Repair repair) {
        return repairRepository.save(repair);
    }

    // ✅ Update repair
    public Repair updateRepair(Long id, Repair updatedRepair) {

        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair not found with id: " + id));

        repair.setCustomerName(updatedRepair.getCustomerName());
        repair.setProductName(updatedRepair.getProductName());
        repair.setIssue(updatedRepair.getIssue());
        repair.setStatus(updatedRepair.getStatus());
        repair.setMobileNumber(updatedRepair.getMobileNumber());

        Repair savedRepair = repairRepository.save(repair);

        // ✅ Send SMS when repair is completed
        if ("Completed".equalsIgnoreCase(updatedRepair.getStatus())) {

            String message = "Dear Customer, your product has been successfully repaired. Please collect it from the shop.";

            smsService.sendSms(
                    repair.getMobileNumber(),
                    message
            );
        }

        return savedRepair;
    }

    // ✅ Delete repair
    public void deleteRepair(Long id) {

        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair not found with id: " + id));

        repairRepository.delete(repair);
    }
}