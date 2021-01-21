package com.filip.vet.api;


import com.filip.vet.dao.Models.Animal;
import com.filip.vet.manager.AnimalManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/Animals")
@CrossOrigin
public class AnimalApi {

    private AnimalManager animals;

    @Autowired
    public AnimalApi(AnimalManager animals) {
        this.animals = animals;
    }

    @GetMapping("/all")
    public Iterable<Animal> getAll(){
        return animals.findAll();
    }

    @GetMapping
    public Optional<Animal> getById(@RequestParam Integer index){
        return animals.findById(index);
    }

    @PostMapping
    public Animal addAnimal(@RequestBody Animal animal){
        return animals.save(animal);
    }

    @PutMapping
    public Animal updateAnimal(@RequestBody Animal animal){
        return animals.save(animal);
    }

    @DeleteMapping
    public void deleteAnimal(@RequestParam Integer index){
        animals.deleteById(index);
    }

}
