package com.filip.vet.dao.Repository;

import com.filip.vet.dao.Models.Animal;
import org.springframework.data.repository.CrudRepository;

public interface AnimalRepo extends CrudRepository<Animal, Integer> {
}
