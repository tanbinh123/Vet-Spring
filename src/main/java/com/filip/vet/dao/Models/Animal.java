package com.filip.vet.dao.Models;

import javax.persistence.*;

@Entity
public class Animal {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int AnimalID;
    private String Name;
    private int Age;
    private String Typ;
    @OneToOne
    private User Owner;

    public Animal() {
    }

    public Animal(int animalID, String name, int age, String typ, User owner) {
        AnimalID = animalID;
        Name = name;
        Age = age;
        Typ = typ;
        Owner = owner;
    }

    public int getAnimalID() {
        return AnimalID;
    }

    public void setAnimalID(int animalID) {
        AnimalID = animalID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public int getAge() {
        return Age;
    }

    public void setAge(int age) {
        Age = age;
    }

    public String getTyp() {
        return Typ;
    }

    public void setTyp(String typ) {
        Typ = typ;
    }

    public User getOwner() {
        return Owner;
    }

    public void setOwner(User owner) {
        Owner = owner;
    }
}
