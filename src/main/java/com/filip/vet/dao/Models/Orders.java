package com.filip.vet.dao.Models;

import javax.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int OrdersID;

    @OneToOne
    private Supply supply;

    public Orders() {
    }

    public Orders(int OrdersID, Supply supply) {
        this.OrdersID = OrdersID;
        this.supply = supply;
    }

    public int getOrdersID() {
        return OrdersID;
    }

    public void setOrdersID(int ordersID) {
        this.OrdersID = ordersID;
    }

    public Supply getSupply() {
        return supply;
    }

    public void setSupply(Supply supply) {
        this.supply = supply;
    }
}
