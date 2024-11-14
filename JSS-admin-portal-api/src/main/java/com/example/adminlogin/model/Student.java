//package com.example.adminlogin.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.Set;
//
//@Table(name = "students")
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Student {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "stud_id")
//    private Long studId;
//
//    @Column(name = "user_name")
//    private String username;
//
//    private String email;
//    private String password; // To store the password
//    private String address;
//    private String dept; // Department field
//    private String semester; // Semester field
//
//    @Column(name = "phone_no")
//    private String phoneno; // Assuming this is a string for storing numbers
//
//    @Column(name = "mom_phone_no")
//    private String momphoneno;
//
//    @Column(name = "dad_phone_no")
//    private String dadphoneno;
//
//    @Column(name = "reg_no")
//    private String regno;
//
//
//}
