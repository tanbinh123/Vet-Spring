package com.filip.vet.dao.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Animal {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int AnimalID;
    private String Name;
    private int Age;
    private String Typ;

    public Animal() {}

    public Animal(int animalID, String name, int age, String typ) {
        AnimalID = animalID;
        Name = name;
        Age = age;
        Typ = typ;
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
}
