package com.ShreeElectronics.model;

import jakarta.persistence.*;

@Entity
@Table(name = "repairs")
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false, length = 10)
    private String mobileNumber;

    @Column(nullable = false)
    private String productName;

    private String issue;

    @Column(nullable = false)
    private String status;

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getProductName() {
        return productName;
    }

    public String getIssue() {
        return issue;
    }

    public String getStatus() {
        return status;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}