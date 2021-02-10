package com.filip.vet.dao.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Supply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SupplyID;
    private String Name;
    private int amount;

    public Supply() {
    }

    public Supply(int supplyID, String name, int amount) {
        SupplyID = supplyID;
        Name = name;
        this.amount = amount;
    }

    public int getSupplyID() {
        return SupplyID;
    }

    public void setSupplyID(int supplyID) {
        SupplyID = supplyID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}

