package fpt.custome.yourlure.service;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    public static String parentPath = System.getProperty("user.dir");
    public static String uploadDir = "/target/classes/uploads";

    static {
        new File(parentPath + uploadDir).mkdir();
    }

    public String saveImage(MultipartFile file) {
        Path filePath = Paths.get(parentPath + uploadDir, file.getOriginalFilename());
        String fileName = file.getOriginalFilename();
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Paths.get(uploadDir, fileName).toString();
    }

    public List<String> saveImages(MultipartFile[] files) {
        List<String> result = new ArrayList<>();
        for (MultipartFile file : files) {
            Path filePath = Paths.get(parentPath + uploadDir, file.getOriginalFilename());
            String fileName = file.getOriginalFilename();
            try {
                Files.write(filePath, file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            result.add(Paths.get(uploadDir, fileName).toString());
        }
        return result;
    }

    public String saveFileByte(String fileName, byte[] content) throws IOException {
        File file = Paths.get(parentPath, uploadDir, fileName).toFile();
        FileUtils.writeByteArrayToFile(file, content);
        return file.getPath();
    }
}
