package com.filip.vet.dao.Repository;

import com.filip.vet.dao.Models.Orders;
import org.springframework.data.repository.CrudRepository;

public interface OrdersRepo extends CrudRepository<Orders, Integer> {
}
