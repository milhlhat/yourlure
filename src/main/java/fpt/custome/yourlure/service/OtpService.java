package fpt.custome.yourlure.service;

import fpt.custome.yourlure.repositories.UserRepos;
import fpt.custome.yourlure.utils.twilio.SmsRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Service;

@Description(value = "Service responsible for handling OTP related functionality.")
@Service
public class OtpService {

    private final Logger LOGGER = LoggerFactory.getLogger(OtpService.class);

    @Autowired
    private OtpGenerator otpGenerator;
    @Autowired
    private SmsService smsService;
    @Autowired
    private UserRepos userRepos;


    /**
     * Method for generate OTP number
     *
     * @param key - provided key (phone number in this case)
     * @return boolean value (true|false)
     */
    public Boolean generateOtp(String key) {
        if(key.startsWith("0")){
            key = "+84" + key.substring(1);
        }
        // generate otp
        Integer otpValue = otpGenerator.generateOTP(key);
        if (otpValue == -1) {
            LOGGER.error("OTP generator is not working...");
            return false;
        }

        LOGGER.info("Generated OTP: {}", otpValue);

        SmsRequest smsRequest = new SmsRequest(key, "Mã xác nhận yourlure.shop của bạn là: " + otpValue);
        // fetch user phone from database
//        User user = userRepos.findByPhone(key);
//
//        SmsRequest smsRequest = SmsRequest.builder()
//                .phoneNumber(user.getPhone())
//                .message("Mã xác nhận yourlure.com của bạn là: " + otpValue).build();

        return smsService.sendSms(smsRequest);
    }

    /**
     * Method for validating provided OTP
     *
     * @param key       - provided key
     * @param otpNumber - provided OTP number
     * @return boolean value (true|false)
     */
    public Boolean validateOTP(String key, Integer otpNumber) {
//        return true;
        if(key.startsWith("0")){
            key = "+84" + key.substring(1);
        }
        // get OTP from cache
        Integer cacheOTP = otpGenerator.getOPTByKey(key);
        if (cacheOTP.equals(otpNumber)) {
            otpGenerator.clearOTPFromCache(key);
            return true;
        }
        return false;
    }
}
