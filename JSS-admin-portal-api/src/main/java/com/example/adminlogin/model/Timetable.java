package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "timetable")
@Data
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timetable_id")  // Set the column name to timetable_id
    private Long timetableId;

    private String subject;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
}
