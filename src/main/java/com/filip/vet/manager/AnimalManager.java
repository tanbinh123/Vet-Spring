package com.filip.vet.manager;

import com.filip.vet.dao.Models.Animal;
import com.filip.vet.dao.Repository.AnimalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnimalManager {
    private AnimalRepo animalRepo;

    @Autowired
    public AnimalManager(AnimalRepo animalRepo) {
        this.animalRepo = animalRepo;
    }

    public Iterable<Animal> findAll() {
        return animalRepo.findAll();
    }

    public Optional<Animal> findById(Integer id) {
        return animalRepo.findById(id);
    }

    public Animal save(Animal animal){
        return animalRepo.save(animal);
    }

    public void deleteById(Integer id) {
        animalRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
       /* save(new Animal(1, "Fufu", 2, "Pies"));
        save(new Animal(2, "Mefi", 1, "Pies"));*/
    }

}
