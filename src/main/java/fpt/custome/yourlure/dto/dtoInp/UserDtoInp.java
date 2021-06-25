package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.UserAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoInp {

    private Long userID;
    private String userName;
    @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
    private String phone;
    private Boolean gender;
    private String userEmail;
    private UserAddress userAddress;

}
