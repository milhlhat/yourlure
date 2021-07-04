package fpt.custome.yourlure.service;

import org.apache.commons.codec.binary.Base64;
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

    public static String parentPath = System.getProperty("user.dir") + "/target/classes/";
    public static final String CUSTOMS_DIR = "customs";
    public static final String IMAGES_DIR = "uploads";
    public static final String MODELS_DIR = "models";
    public static final String TEXTURE_DIR = "textures";

    static {
        new File(parentPath + CUSTOMS_DIR).mkdir();
        new File(parentPath + MODELS_DIR).mkdir();
        new File(parentPath + IMAGES_DIR).mkdir();
        new File(parentPath + TEXTURE_DIR).mkdir();
    }

    public String saveImage(MultipartFile file) {
        Path filePath = Paths.get(parentPath + IMAGES_DIR, file.getOriginalFilename());
        String fileName = file.getOriginalFilename();
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Paths.get(CUSTOMS_DIR, fileName).toString();
    }

    public List<String> saveImages(MultipartFile[] files) {
        List<String> result = new ArrayList<>();
        for (MultipartFile file : files) {
            Path filePath = Paths.get(parentPath + IMAGES_DIR, file.getOriginalFilename());
            String fileName = file.getOriginalFilename();
            try {
                Files.write(filePath, file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            result.add(Paths.get(CUSTOMS_DIR, fileName).toString());
        }
        return result;
    }

    public String saveFileByte(String fileName, byte[] content, String path) throws IOException {
        File file = Paths.get(parentPath, path, fileName).toFile();
        FileUtils.writeByteArrayToFile(file, content);
        return path + "/" + fileName;
    }

    public String saveFileBase64(String fileName, String content, String path) throws IOException {
        return saveFileByte(fileName, Base64.decodeBase64(content), path);
    }

    public Boolean deleteFile(String filePath) {
        try {
            return Files.deleteIfExists(Paths.get(parentPath, filePath));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
