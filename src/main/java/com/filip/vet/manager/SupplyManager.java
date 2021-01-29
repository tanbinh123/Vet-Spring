package com.filip.vet.manager;

import com.filip.vet.dao.Models.Supply;
import com.filip.vet.dao.Repository.SupplyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SupplyManager {
    private SupplyRepo supplyRepo;

    @Autowired
    public SupplyManager(SupplyRepo supplyRepo) {
        this.supplyRepo = supplyRepo;
    }

    public Iterable<Supply> findAll() {
        return supplyRepo.findAll();
    }

    public Optional<Supply> findById(Integer id) {
        return supplyRepo.findById(id);
    }

    public Supply save(Supply supply){
        return supplyRepo.save(supply);
    }

    public void deleteById(Integer id) {
        supplyRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
    }

}
