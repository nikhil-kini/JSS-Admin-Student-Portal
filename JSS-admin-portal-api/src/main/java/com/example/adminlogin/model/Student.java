package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Table(name = "Students")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @ManyToMany
    @JoinTable(
            name = "student_roles",
            joinColumns = @JoinColumn(name = "stud_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
}
