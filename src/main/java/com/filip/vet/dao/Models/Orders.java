package com.filip.vet.dao.Models;

import javax.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int OrdersID;

    private String Name;
    private int Amount;

    public Orders() {
    }

    public Orders(int ordersID, String name, int amount) {
        OrdersID = ordersID;
        Name = name;
        Amount = amount;
    }

    public int getOrdersID() {
        return OrdersID;
    }

    public void setOrdersID(int ordersID) {
        OrdersID = ordersID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public int getAmount() {
        return Amount;
    }

    public void setAmount(int amount) {
        Amount = amount;
    }
}
