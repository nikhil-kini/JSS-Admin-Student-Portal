package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
//    @JoinColumn(name = "role_id", nullable = false)
//@Enumerated(EnumType.STRING)


//    private Role role;

}

