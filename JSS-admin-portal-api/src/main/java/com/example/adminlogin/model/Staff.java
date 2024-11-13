package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "staff")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String staffName;
    private String email;
    private String password;
    private String phoneno;
    private String address;
    private String adharno;

//    @Lob
//    private byte[] sslcMarksCard;
//
//    @Lob
//    private byte[] beMarksCard;
//
//    @Lob
//    private byte[] degreeCertificate;
//
//    @Lob
//    private byte[] photo;

    private String sslcMarksCardPath;  // Path to the uploaded SSL Marks Card
    private String beMarksCardPath;    // Path to the uploaded BE Marks Card
    private String degreeCertificatePath; // Path to the uploaded Degree Certificate
    private String photoPath;          // Path to the uploaded photo

}
