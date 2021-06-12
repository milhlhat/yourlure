package fpt.custome.yourlure.service;


// Install the Java helper library from twilio.com/docs/java/install

import fpt.custome.yourlure.utils.twilio.SmsRequest;
import fpt.custome.yourlure.utils.twilio.SmsSender;
import fpt.custome.yourlure.utils.twilio.TwilioSmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    private final SmsSender smsSender;

    @Autowired
    public SmsService(@Qualifier("twilio") TwilioSmsSender smsSender) {
        this.smsSender = smsSender;
    }

    public void sendSms(SmsRequest smsRequest) {
        smsSender.sendSms(smsRequest);
    }


}

