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
    private String dept;
    private String semester;

    @Column(name = "phone_no")
    private String phoneno;

    @Column(name = "mom_phone_no")
    private String momphoneno;

    @Column(name = "dad_phone_no")
    private String dadphoneno;

    @Column(name = "reg_no")
    private String regno;

    private String adharno;

    private String panCardNumber;

    private String sslcMarksCardPath;
    private String beMarksCardPath;
    private String degreeCertificatePath;
    private String photoPath;
    private String staffProfilePath;
    private String adharCardPath;
    private String studyCertificatePath;
    private String transferCertificatePath;
    private String physicalFitnessPath;
    private String migrationCertificatePath;
    private String incomeCertificatePath;
    private String casteCertificatePath;
    private String studsslcmarksCardPath;
    private String studphotoPath;




}

