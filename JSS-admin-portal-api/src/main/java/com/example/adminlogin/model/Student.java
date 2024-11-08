package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "stud_id")
    private Long studId;

    @Column(name = "user_name")
    private String username;

    private String email;

    private String password;

    private String dept;

    private String semester;

//    @JoinColumn(name = "role_id", nullable = false)
//    private Role role;



}
