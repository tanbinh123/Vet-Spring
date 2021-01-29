package com.filip.vet.api;


import com.filip.vet.dao.Models.Visit;
import com.filip.vet.manager.VisitManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/Visits")
@CrossOrigin
public class VisitApi {

    private VisitManager visits;

    @Autowired
    public VisitApi(VisitManager visits) {
        this.visits = visits;
    }

    @GetMapping("/all")
    public Iterable<Visit> getAll(){
        return visits.findAll();
    }

    @GetMapping
    public Optional<Visit> getById(@RequestParam Integer index){
        return visits.findById(index);
    }

    @PostMapping
    public Visit addVisit(@RequestBody Visit visit){
        return visits.save(visit);
    }

    @PutMapping
    public Visit updateVisit(@RequestBody Visit visit){
        return visits.save(visit);
    }

    @DeleteMapping
    public void deleteVisit(@RequestParam Integer index){
        visits.deleteById(index);
    }

}
