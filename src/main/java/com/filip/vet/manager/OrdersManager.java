package com.filip.vet.manager;

import com.filip.vet.dao.Models.Orders;
import com.filip.vet.dao.Repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrdersManager {
    private OrdersRepo ordersRepo;

    @Autowired
    public OrdersManager(OrdersRepo ordersRepo) {
        this.ordersRepo = ordersRepo;
    }

    public Iterable<Orders> findAll() {
        return ordersRepo.findAll();
    }

    public Optional<Orders> findById(Integer id) {
        return ordersRepo.findById(id);
    }

    public Orders save(Orders order){
        return ordersRepo.save(order);
    }

    public void deleteById(Integer id) {
        ordersRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
    }

}
