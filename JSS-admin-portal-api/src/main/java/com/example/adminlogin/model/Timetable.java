package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "timetables")
@Data
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timeId;

    private int semester;
    private String day;
    private String timeSlot;
    private String subject;
}
