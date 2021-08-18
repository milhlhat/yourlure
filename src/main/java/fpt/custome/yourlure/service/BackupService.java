package fpt.custome.yourlure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class BackupService {

    public static final String parent = "/home/ubuntu/dbbackup/";

    @Autowired
    private FileService fileService;

    public boolean runCmd(String cmd) {
        ProcessBuilder processBuilder = new ProcessBuilder();

        // -- Linux --
        // Run a shell command
        processBuilder.command("bash", "-c", cmd);

        // Run a shell script
        //processBuilder.command("path/to/hello.sh");

        try {
            Process process = processBuilder.start();
            // ignore result string
            int exitVal = process.waitFor();
            return true;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean backup() {
        if (!fileService.isFileExist(parent)) {
            new File(parent).mkdir();
        }
        Date today = new Date();
        String filePath = parent + today;
        String cmd = "PGPASSWORD=\"sa\" pg_dump -Fc -h 127.0.0.1 -U sa -d yourlure -f \"" + filePath + ".dump\"";
        return runCmd(cmd);
    }

    public List<String> findAllRestores() {
        return fileService.getFileInFolder(parent);
    }

    public boolean restore(String fileName) {
        String filePath = parent + fileName;
        if (fileService.isFileExist(filePath)) {
            String cmd = "PGPASSWORD=\"sa\" pg_restore -d yourlure -h 127.0.0.1 -U sa \"" + filePath + "\"";
            return runCmd(cmd);
        }
        throw new ValidationException("File không tồn tại! vui lòng kiểm tra lại.");
    }

    public boolean deleteBackup(String fileName){
        String filePath = parent + fileName;
        return fileService.deleteFilePath(filePath);
    }

}
