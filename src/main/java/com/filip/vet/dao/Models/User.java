package com.filip.vet.dao.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    public enum Rank{
        CLIENT,
        WORKER,
        ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String Email;
    private String Password;
    private Rank Rank;
    @OneToMany
    private List<Animal> Animal;

    public User() {
    }

    public User(int ID, String email, String password, User.Rank rank, List<com.filip.vet.dao.Models.Animal> animal) {
        this.ID = ID;
        Email = email;
        Password = password;
        Rank = rank;
        Animal = animal;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public User.Rank getRank() {
        return Rank;
    }

    public void setRank(User.Rank rank) {
        Rank = rank;
    }

    public List<com.filip.vet.dao.Models.Animal> getAnimal() {
        return Animal;
    }

    public void setAnimal(List<com.filip.vet.dao.Models.Animal> animal) {
        Animal = animal;
    }
}

