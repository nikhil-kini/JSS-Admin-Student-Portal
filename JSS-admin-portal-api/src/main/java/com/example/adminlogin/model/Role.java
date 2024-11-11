package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Roles")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    private String roleName;

//  @ManyToMany(mappedBy = "roles")
//    private Set<User> users;
//
//    @ManyToMany(mappedBy = "roles")
//    private Set<Student> students;
}

