package fpt.custome.yourlure.utils.twilio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@ToString
public class SmsRequest {

    @NotBlank
    private final String phoneNumber; // destination

    @NotBlank
    private final String message;

    public SmsRequest(@JsonProperty("phoneNumber") String phoneNumber,
                      @JsonProperty("message") String message) {
        this.phoneNumber = phoneNumber;
        this.message = message;
    }

}
