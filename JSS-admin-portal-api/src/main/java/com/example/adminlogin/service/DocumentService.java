import java.io.File;
import java.io.IOException;

public class FileConversionService {

    public File convertDocxToPdf(File wordFile) throws IOException {
        // Path to the LibreOffice installation directory (adjust this according to your installation)
        String libreOfficePath = "C:/Program Files/LibreOffice/program/soffice.exe"; // Change as needed
        String inputFilePath = wordFile.getAbsolutePath();
        String outputFilePath = inputFilePath.replace(".docx", ".pdf");

        // Command to convert .docx to .pdf using LibreOffice in headless mode
        String[] command = {
                libreOfficePath,
                "--headless",    // Run LibreOffice without GUI
                "--convert-to", "pdf",  // Output format as PDF
                "--outdir", new File(outputFilePath).getParent(), // Set the output directory
                inputFilePath  // Input file
        };

        // Execute the command to convert the document
        Process process = Runtime.getRuntime().exec(command);

        try {
            // Wait for the process to finish
            process.waitFor();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Return the converted PDF file
        return new File(outputFilePath);
    }
}
