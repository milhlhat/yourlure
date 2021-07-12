package fpt.custome.yourlure.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import fpt.custome.yourlure.utils.RandomString;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DriveService {
    private static final String APPLICATION_NAME = "drive_service";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    /**
     * Creates an authorized Credential object.
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = DriveService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    public static String uploadFile(Drive service, String path) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(path.substring(path.lastIndexOf("/") + 1));
//        fileMetadata.setShared(true);
        fileMetadata.setMimeType("application/vnd.google-apps.drive-sdk");

        java.io.File filePath = new java.io.File(path);
        FileContent mediaContent = new FileContent("glb/gltf", filePath);
        File file = service.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();
        System.out.println("File ID: " + file.getId());
        return file.getId();
    }

    public static String createFolder(Drive driveService) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName("3d_Model.glb");
        fileMetadata.setMimeType("application/vnd.google-apps.folder");

        File file = driveService.files().create(fileMetadata)
                .setFields("id")
                .execute();
        return file.getId();
    }

    public static List<String> uploadFileToFolder(Drive driveService, String folderId, List<String> filePaths) throws IOException {
        List<String> uploadFileIds = new ArrayList<>();

        for(String path : filePaths){
            File fileMetadata = new File();
            fileMetadata.setName(path.substring(path.lastIndexOf("/") + 1));
            fileMetadata.setParents(Collections.singletonList(folderId));
            fileMetadata.setShared(true);
            java.io.File filePath = new java.io.File(path);
            FileContent mediaContent = new FileContent("image/jpeg", filePath);
            File file = driveService.files().create(fileMetadata, mediaContent)
                    .setFields("id, parents")
                    .execute();
            System.out.println("File ID: " + file.getId());
        }
       return uploadFileIds;
    }


//    public static void main(String... args) throws IOException, GeneralSecurityException {
//        // Build a new authorized API client service.
//        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
//        Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
//                .setApplicationName(APPLICATION_NAME)
//                .build();
//
//        // upload a file
//        String fileUploadId = uploadFile(service, "/Users/ngominhthang/Documents/Blender_Project/model_activated/gltf/model_1.glb");
//        String image_url = "https://drive.google.com/uc?export=view&id=" + fileUploadId;
//        System.out.println(image_url);
//    }

    public static void main(String[] args) throws FileNotFoundException {
//        java.io.File file = ResourceUtils.getFile("classpath:model/model_1.glb");
//        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//        System.out.println(resource);

        RandomString gen = new RandomString(8, ThreadLocalRandom.current());
        System.out.println(gen.nextString());
    }
}
