//package com.example.adminlogin;
//
//import org.apache.pdfbox.pdmodel.PDDocument;
//import org.apache.pdfbox.pdmodel.PDPage;
//import org.apache.pdfbox.pdmodel.PDPageContentStream;
//import org.apache.pdfbox.pdmodel.font.PDType0Font;
//import org.apache.poi.xslf.usermodel.XMLSlideShow;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.apache.poi.xwpf.usermodel.XWPFDocument;
//import org.apache.poi.xwpf.usermodel.XWPFParagraph;
//import org.springframework.stereotype.Component;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//@Component
//public class FileConverter {
//
//    // Method to convert file to PDF based on the extension
//    public Path convertToPdf(Path filePath) throws IOException {
//        // Get file extension and check if conversion is needed
//        String extension = getFileExtension(filePath);
//        Path pdfPath = Paths.get(filePath.toString().replace(extension, "pdf"));
//
//        switch (extension.toLowerCase()) {
//            case "docx":
//                convertDocxToPdf(filePath, pdfPath);
//                break;
//            case "pptx":
//                convertPptxToPdf(filePath, pdfPath);
//                break;
//            case "xlsx":
//                convertXlsxToPdf(filePath, pdfPath);
//                break;
//            default:
//                throw new IOException("Unsupported file type for conversion: " + extension);
//        }
//
//        return pdfPath;
//    }
//
//    // Method to get the file extension
//    private String getFileExtension(Path filePath) {
//        return filePath.toString().substring(filePath.toString().lastIndexOf(".") + 1);
//    }
//
//    // Convert DOCX file to PDF
//    private void convertDocxToPdf(Path inputPath, Path outputPath) throws IOException {
//        try (FileInputStream fis = new FileInputStream(inputPath.toFile());
//             XWPFDocument doc = new XWPFDocument(fis);
//             PDDocument pdfDoc = new PDDocument()) {
//
//            PDPage page = new PDPage();
//            pdfDoc.addPage(page);
//
//            // Load font (Ensure the font path is correct)
//            Path fontPath = Paths.get("C:/Users/nithya prashanth/Desktop/images/personaldocupload/1st year/fonts/unicode-font.ttf");
//            PDType0Font font = PDType0Font.load(pdfDoc, fontPath.toFile());
//
//            PDPageContentStream contentStream = new PDPageContentStream(pdfDoc, page);
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(50, 750);
//
//            for (XWPFParagraph paragraph : doc.getParagraphs()) {
//                contentStream.showText(paragraph.getText());
//                contentStream.newLineAtOffset(0, -15);  // Move to next line
//            }
//
//            contentStream.endText();
//            contentStream.close();
//
//            pdfDoc.save(outputPath.toFile());
//        }
//    }
//
//    // Convert PPTX file to PDF
//    private void convertPptxToPdf(Path inputPath, Path outputPath) throws IOException {
//        try (FileInputStream fis = new FileInputStream(inputPath.toFile());
//             XMLSlideShow ppt = new XMLSlideShow(fis);
//             PDDocument pdfDoc = new PDDocument()) {
//
//            // Add each slide as a new page in the PDF (this is basic conversion without detailed slide content)
//            for (int i = 0; i < ppt.getSlides().size(); i++) {
//                PDPage page = new PDPage();
//                pdfDoc.addPage(page);
//                PDPageContentStream contentStream = new PDPageContentStream(pdfDoc, page);
//                contentStream.beginText();
//                contentStream.setFont(PDType0Font.load(pdfDoc, new File("C:/Users/nithya prashanth/Desktop/images/personaldocupload/1st year/fonts/unicode-font.ttf")), 12);
//                contentStream.newLineAtOffset(50, 750);
//                contentStream.showText("Slide " + (i + 1));
//                contentStream.endText();
//                contentStream.close();
//            }
//
//            pdfDoc.save(outputPath.toFile());
//        }
//    }
//
//    // Convert XLSX file to PDF
//    private void convertXlsxToPdf(Path inputPath, Path outputPath) throws IOException {
//        try (FileInputStream fis = new FileInputStream(inputPath.toFile());
//             XSSFWorkbook workbook = new XSSFWorkbook(fis);
//             PDDocument pdfDoc = new PDDocument()) {
//
//            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
//                PDPage page = new PDPage();
//                pdfDoc.addPage(page);
//                PDPageContentStream contentStream = new PDPageContentStream(pdfDoc, page);
//                contentStream.beginText();
//                contentStream.setFont(PDType0Font.load(pdfDoc, new File("C:/Users/nithya prashanth/Desktop/images/personaldocupload/1st year/fonts/unicode-font.ttf")), 12);
//                contentStream.newLineAtOffset(50, 750);
//                contentStream.showText("Sheet: " + workbook.getSheetAt(i).getSheetName());
//                contentStream.endText();
//                contentStream.close();
//            }
//
//            pdfDoc.save(outputPath.toFile());
//        }
//    }
//}