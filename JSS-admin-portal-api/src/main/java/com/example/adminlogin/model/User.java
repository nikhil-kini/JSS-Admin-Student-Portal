package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.Set;

@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Role")
    private String role;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_name")
    private String userName;


    private String address;
    private String dept; // Department field
    private String semester; // Semester field

    @Column(name = "phone_no")
    private String phoneno; // Assuming this is a string for storing numbers

    @Column(name = "mom_phone_no")
    private String momphoneno;

    @Column(name = "dad_phone_no")
    private String dadphoneno;

    @Column(name = "reg_no")
    private String regno;
    private String adharno;
    private String sslcMarksCardPath;
    private String beMarksCardPath;
    private String degreeCertificatePath;
    private String photoPath;


}

