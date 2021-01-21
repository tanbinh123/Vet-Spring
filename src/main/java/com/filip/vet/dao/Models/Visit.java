package com.filip.vet.dao.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int VisitID;
    private String Day;

    @OneToOne
    private Animal animal;

    @OneToOne
    private User client;

    @OneToOne
    private User worker;

    @OneToMany
    private List<Supply> supplyList;

    public Visit() {
    }

    public Visit(int visitID, String day, Animal animal, User client, User worker, List<Supply> supplyList) {
        VisitID = visitID;
        Day = day;
        this.animal = animal;
        this.client = client;
        this.worker = worker;
        this.supplyList = supplyList;
    }

    public int getVisitID() {
        return VisitID;
    }

    public void setVisitID(int visitID) {
        VisitID = visitID;
    }

    public String getDay() {
        return Day;
    }

    public void setDay(String day) {
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

    public User getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }

    public List<Supply> getSupplyList() {
        return supplyList;
    }

    public void setSupplyList(List<Supply> supplyList) {
        this.supplyList = supplyList;
    }
}
