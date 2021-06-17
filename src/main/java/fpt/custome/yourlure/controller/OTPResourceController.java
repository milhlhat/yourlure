package fpt.custome.yourlure.controller;

import fpt.custome.yourlure.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Description(value = "Resource for generating and validating OTP requests.")
@RestController
@RequestMapping("/api/otp")
public class OTPResourceController {

    @Autowired
    private OtpService otpService;

    @PostMapping(value = "/generate")
    public ResponseEntity<Object> generateOTP(@RequestBody @Valid String phoneNumber) {
        // check authentication
        if (phoneNumber == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // generate OTP.
        Boolean isGenerated = otpService.generateOtp(phoneNumber);
        if (!isGenerated) {
            return new ResponseEntity<>("OTP can not be generated.", HttpStatus.BAD_REQUEST);
        }

        // success message
        return new ResponseEntity<>("OTP successfully generated. Please check your phone!", HttpStatus.OK);
    }

    @PostMapping(value = "/validate-otp")
    public ResponseEntity<String> validateOTP(@RequestParam @Valid String phone, @RequestParam @Valid Integer otp){
        Boolean isValid = otpService.validateOTP(phone, otp);
        if (!isValid) {
            return new ResponseEntity<>("fail to validate otp!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("validated success!", HttpStatus.OK);
    }


//    @PostMapping(value = "validate", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<Object> validateOTP(@RequestBody Map<String, Object> otp) {
//
//        // authen name khi user đã đăng nhập
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//
//        Map<String, String> response = new HashMap<>(2);
//
//        // check authentication
//        if (username == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        // validate provided OTP.
//        Boolean isValid = otpService.validateOTP(username, (Integer) otp.get("otp"));
//        if (!isValid) {
//            response.put("status", "error");
//            response.put("message", "OTP is not valid!");
//
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//        // success message
//        response.put("status", "success");
//        response.put("message", "Entered OTP is valid!");
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

}
