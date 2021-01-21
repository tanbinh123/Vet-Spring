package com.filip.vet.dao.Repository;

import com.filip.vet.dao.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Integer> {
}
