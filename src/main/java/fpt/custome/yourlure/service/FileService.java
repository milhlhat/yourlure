package fpt.custome.yourlure.service;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
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

    public static String parentPath = System.getProperty("user.dir") + "/classes/";
    public static final String CUSTOMS_DIR = "static/customs";
    public static final String UPLOADS = "static/uploads";
    public static final String MODELS_DIR = "static/models";
    public static final String TEXTURE_DIR = "static/textures";

    static {
        new File(parentPath + CUSTOMS_DIR).mkdir();
        new File(parentPath + MODELS_DIR).mkdir();
        new File(parentPath + UPLOADS).mkdir();
        new File(parentPath + TEXTURE_DIR).mkdir();
    }

    public Boolean isFileExist(String filePath) {
        File f = new File(filePath);
        return f.exists() && !f.isDirectory();
    }


    public String saveMultipartFile(MultipartFile file, String path, String fileName) {
        Path filePath = Paths.get(parentPath, path, fileName);
        System.out.println(filePath);
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path + "/" + fileName;
    }

    public List<String> saveMultipartFiles(MultipartFile[] files, String path) {
        List<String> result = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = new Date() + RandomStringUtils.randomAlphabetic(6) + Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf("."));
            result.add(saveMultipartFile(file, path, fileName));
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

    public void deleteFiles(List<String> listFile){
        try {
            for (String item : listFile) {
                Files.deleteIfExists(Paths.get(parentPath, item));
            }
        } catch (IOException e) {
            e.printStackTrace();
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

    public File getFile(String relativePath){
        return new File(String.valueOf(Paths.get(parentPath, relativePath)));
    }

}
