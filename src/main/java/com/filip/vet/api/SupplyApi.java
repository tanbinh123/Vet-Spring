package com.filip.vet.api;


import com.filip.vet.dao.Models.Supply;
import com.filip.vet.manager.SupplyManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/Supplies")
@CrossOrigin
public class SupplyApi {

    private SupplyManager supplies;

    @Autowired
    public SupplyApi(SupplyManager supplies) {
        this.supplies = supplies;
    }

    @GetMapping("/all")
    public Iterable<Supply> getAll(){
        return supplies.findAll();
    }

    @GetMapping
    public Optional<Supply> getById(@RequestParam Integer index){
        return supplies.findById(index);
    }

    @PostMapping
    public Supply addSupply(@RequestBody Supply supply){
        return supplies.save(supply);
    }

    @PutMapping
    public Supply updateSupply(@RequestBody Supply supply){
        return supplies.save(supply);
    }

    @DeleteMapping
    public void deleteSupply(@RequestParam Integer index){
        supplies.deleteById(index);
    }

}
