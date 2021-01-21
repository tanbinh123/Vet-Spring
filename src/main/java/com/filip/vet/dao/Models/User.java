package com.filip.vet.dao.Models;

import javax.persistence.*;

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

    public User() {
    }

    public User(int ID, String email, String password, User.Rank rank) {
        this.ID = ID;
        Email = email;
        Password = password;
        Rank = rank;
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
}

