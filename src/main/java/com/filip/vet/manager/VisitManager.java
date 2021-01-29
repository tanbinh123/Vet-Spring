package com.filip.vet.manager;

import com.filip.vet.dao.Models.Visit;
import com.filip.vet.dao.Repository.VisitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VisitManager {
    private VisitRepo visitRepo;

    @Autowired
    public VisitManager(VisitRepo visitRepo) {
        this.visitRepo = visitRepo;
    }

    public Iterable<Visit> findAll() {
        return visitRepo.findAll();
    }

    public Optional<Visit> findById(Integer id) {
        return visitRepo.findById(id);
    }

    public Visit save(Visit visit){
        return visitRepo.save(visit);
    }

    public void deleteById(Integer id) {
        visitRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
    }

}
