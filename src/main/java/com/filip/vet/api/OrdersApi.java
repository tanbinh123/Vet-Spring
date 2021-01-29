package com.filip.vet.api;


import com.filip.vet.dao.Models.Orders;
import com.filip.vet.manager.OrdersManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/Orders")
@CrossOrigin
public class OrdersApi {

    private OrdersManager orders;

    @Autowired
    public OrdersApi(OrdersManager orders) {
        this.orders = orders;
    }

    @GetMapping("/all")
    public Iterable<Orders> getAll(){
        return orders.findAll();
    }

    @GetMapping
    public Optional<Orders> getById(@RequestParam Integer index){
        return orders.findById(index);
    }

    @PostMapping
    public Orders addOrder(@RequestBody Orders order){
        return orders.save(order);
    }

    @PutMapping
    public Orders updateOrders(@RequestBody Orders order){
        return orders.save(order);
    }

    @DeleteMapping
    public void deleteOrders(@RequestParam Integer index){
        orders.deleteById(index);
    }

}
