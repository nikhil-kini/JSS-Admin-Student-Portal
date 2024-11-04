package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "personaldocument")

public class Pdocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "pdoc_id")
    private Long pdocId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    //    @Temporal(TemporalType.TIMESTAMP)
    private String uploadDate;



    //    @Lob
//    private byte[] fileData;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}





