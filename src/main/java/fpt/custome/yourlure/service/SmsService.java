package fpt.custome.yourlure.service;


// Install the Java helper library from twilio.com/docs/java/install

import fpt.custome.yourlure.utils.twilio.SmsRequest;
import fpt.custome.yourlure.utils.twilio.SmsSender;
import fpt.custome.yourlure.utils.twilio.TwilioSmsSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final Logger LOGGER = LoggerFactory.getLogger(SmsService.class);

    private final SmsSender smsSender;

    @Autowired
    public SmsService(@Qualifier("twilio") TwilioSmsSender smsSender) {
        this.smsSender = smsSender;
    }

    public Boolean sendSms(SmsRequest smsRequest) {
        try{
            smsSender.sendSms(smsRequest);
            return true;
        }catch (Exception e){
            LOGGER.error("Sending sms error: {}", e.getMessage());
            return false;
        }

    }


}

