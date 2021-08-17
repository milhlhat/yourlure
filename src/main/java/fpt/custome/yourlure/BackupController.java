package fpt.custome.yourlure;

import fpt.custome.yourlure.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ValidationException;

@RestController
@RequestMapping(path = "/db")
public class BackupController {

    @Autowired
    private BackupService backupService;

    @GetMapping(value = "/backup")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Object> backup() {
        try {
            return new ResponseEntity<>(backupService.backup(), HttpStatus.OK);
        } catch (ValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/all-versions")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Object> findAllVersions() {
        try {
            return new ResponseEntity<>(backupService.findAllRestores(), HttpStatus.OK);
        } catch (ValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/restore")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Object> restore(@RequestBody String fileName) {
        try {
            return new ResponseEntity<>(backupService.restore(fileName), HttpStatus.OK);
        } catch (ValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
