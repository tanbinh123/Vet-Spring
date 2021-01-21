package com.filip.vet.manager;

import com.filip.vet.dao.Models.User;
import com.filip.vet.dao.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserManager {
    private UserRepo userRepo;

    @Autowired
    public UserManager(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Iterable<User> findAll() {
        return userRepo.findAll();
    }

    public Optional<User> findById(Integer id) {
        return userRepo.findById(id);
    }

    public User save(User user){
        return userRepo.save(user);
    }

    public void deleteById(Integer id) {
        userRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
       // save(new User(1, "client1@gmail.com", "password", User.Rank.CLIENT));
        //save(new Client(2, "client2@gmail.com", "password", User.Rank.CLIENT));
    }

}
