package fpt.custome.yourlure.service;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
//import java.util.*;

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

    public Boolean isFileExist(String filePath) {
        File f = new File(filePath);
        return f.exists() && !f.isDirectory();
    }

    public String saveMultipartFile(String fileName, MultipartFile file, String path) {
        Path filePath = Paths.get(parentPath, path, fileName);
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path + "/" + fileName;
    }

    public String saveImage(MultipartFile file, String path, String fileName) {
        Path filePath = Paths.get(parentPath, path, fileName);
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path + "/" + fileName;
    }

    public List<String> saveImages(MultipartFile[] files, String path) {
        List<String> result = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = new Date().getTime() + Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf("."));
            result.add(saveImage(file, path, fileName));
        }
        return result;
    }

    public String saveFileByte(String fileName, byte[] content, String path) throws IOException {
        File file = Paths.get(parentPath, path, fileName).toFile();
        FileUtils.writeByteArrayToFile(file, content);
        return path + "/" + fileName;
    }

    public String saveFileBase64(String fileName, String content, String path) throws IOException {
        if(content.contains(",")){
            content = content.split(",")[1];
        }
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

    public String getFileBase64(String filePath) {
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File(parentPath + filePath));
            String encodedString = new String(Base64.encodeBase64(fileContent), StandardCharsets.US_ASCII);
            return encodedString;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

}