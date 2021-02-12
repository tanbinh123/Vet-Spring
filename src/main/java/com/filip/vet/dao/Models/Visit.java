package com.filip.vet.dao.Models;

import javax.persistence.*;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int VisitID;
    private String Time;
    private int Day;

    @OneToOne
    private Animal animal;

    @OneToOne
    private User client;


    public Visit() {
    }

    public Visit(int visitID, String time, int day, Animal animal, User client) {
        VisitID = visitID;
        Time = time;
        Day = day;
        this.animal = animal;
        this.client = client;
    }

    public int getVisitID() {
        return VisitID;
    }

    public void setVisitID(int visitID) {
        VisitID = visitID;
    }

    public String getTime() {
        return Time;
    }

    public void setTime(String time) {
        Time = time;
    }

    public int getDay() {
        return Day;
    }

    public void setDay(int day) {
        Day = day;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }
}
