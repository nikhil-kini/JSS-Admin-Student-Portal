package com.example.adminlogin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor

@Data
@Entity
public class Fileupdown {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int timeId;
//    private String day;
//    private int semester;
//    private String subject;
//    private String timeSlot;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  int id;
    private  String userName;
    @Lob
    @Column(length = 1000000)
    private byte[] displayPicture;

}