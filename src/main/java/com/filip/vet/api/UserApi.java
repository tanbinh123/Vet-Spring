package com.filip.vet.api;

import com.filip.vet.dao.Models.Animal;
import com.filip.vet.dao.Models.User;
import com.filip.vet.manager.AnimalManager;
import com.filip.vet.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/Users")
@CrossOrigin
public class UserApi {

    private UserManager users;

    @Autowired
    public UserApi(UserManager users) {
        this.users = users;
    }

    @GetMapping("/all")
    public Iterable<User> getAll(){
        return users.findAll();
    }

    @GetMapping
    public Optional<User> getById(@RequestParam Integer index){
        return users.findById(index);
    }

    @PostMapping
    public User addUser(@RequestBody User user){
        return users.save(user);
    }

    @PutMapping
    public User updateUser(@RequestBody User user){
        return users.save(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Integer index){
        users.deleteById(index);
    }
}
