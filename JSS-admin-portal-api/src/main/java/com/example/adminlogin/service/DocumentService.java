//package com.example.adminlogin.service;
//
//import org.springframework.stereotype.Service;
//
//import java.io.File;
//import java.io.IOException;
//
//@Service
//public class DocumentService {
////    public File convertDocxToPdf(File wordFile) throws IOException {
////        // Path to the LibreOffice installation directory (adjust this according to your installation)
////        String libreOfficePath = "C:/Program Files/LibreOffice/program/soffice.exe"; // Change as needed
////        String inputFilePath = wordFile.getAbsolutePath();
////        String outputFilePath = inputFilePath.replace(".docx", ".pdf");
////
////        // Command to convert .docx to .pdf using LibreOffice in headless mode
////        String[] command = {
////                libreOfficePath,
////                "--headless",    // Run LibreOffice without GUI
////                "--convert-to", "pdf",  // Output format as PDF
////                "--outdir", new File(outputFilePath).getParent(), // Set the output directory
////                inputFilePath  // Input file
////        };
////
////        // Execute the command to convert the document
////        Process process = Runtime.getRuntime().exec(command);
////
////        try {
////            // Wait for the process to finish
////            process.waitFor();
////        } catch (InterruptedException e) {
////            e.printStackTrace();
////        }
////
////        // Return the converted PDF file
////        return new File(outputFilePath);
////    }
////}
//
//
//    // Path to LibreOffice installation directory (adjust as needed)
//    private static final String LIBRE_OFFICE_PATH = "C:/docuconverter\\program";
//
//    public File convertToPdf(File sourceFile) throws IOException {
//        String inputFilePath = sourceFile.getAbsolutePath();
//        String outputFilePath = inputFilePath.replaceAll("\\.\\w+$", ".pdf"); // Replace extension with .pdf
//
//        // Command to convert the file
//        String[] command = {
//                LIBRE_OFFICE_PATH,
//                "--headless",        // Run LibreOffice in headless mode
//                "--convert-to", "pdf",
//                "--outdir", sourceFile.getParent(), // Output directory is the same as the input file's
//                inputFilePath
//        };
//
//        Process process = Runtime.getRuntime().exec(command);
//
//        try {
//            int exitCode = process.waitFor();
//            if (exitCode != 0) {
//                throw new IOException("LibreOffice conversion failed with exit code " + exitCode);
//            }
//        } catch (InterruptedException e) {
//            Thread.currentThread().interrupt();
//            throw new IOException("LibreOffice conversion was interrupted", e);
//        }
//
//        File pdfFile = new File(outputFilePath);
//        if (!pdfFile.exists()) {
//            throw new IOException("PDF conversion failed: Output file not found");
//        }
//
//        return pdfFile;
//    }
//}