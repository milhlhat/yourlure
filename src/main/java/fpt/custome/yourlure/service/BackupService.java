package fpt.custome.yourlure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BackupService {

    public static final String parent = "/home/ubuntu/dbbackup/";

    static final SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

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
        String today = df.format(new Date()).replaceAll("/", "-");
        String filePath = parent + today;
        String cmd = "PGPASSWORD=\"sa\" pg_dump -Fc -h 127.0.0.1 -U sa -d yourlure -f \"" + filePath + ".dump\"";
        return runCmd(cmd);
    }

    public List<String> findAllRestores() {
        List<String> files = fileService.getFileInFolder(parent);
        files.sort((o1, o2) -> {
            DateFormat df = new SimpleDateFormat();
            try {
                Date date1 = df.parse(o1.substring(0, o1.lastIndexOf(".")).replaceAll("-","/"));
                Date date2 = df.parse(o2.substring(0, o2.lastIndexOf(".")).replaceAll("-","/"));
                return date1.compareTo(date2);

            } catch (ParseException e) {
                e.printStackTrace();
            }
            return 0;
        });
        return files;
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

//    public static void main(String[] args) throws ParseException {
//        String today = df.format(new Date());
//        String filePath = parent + today;
//        System.out.println(filePath);
//
//        Date date1 = df.parse("21/12/2021 05:05:05");
//        Date date2 = df.parse("21/12/2021 06:05:05");
//
//        System.out.println(date1.compareTo(date2));
//    }

}
