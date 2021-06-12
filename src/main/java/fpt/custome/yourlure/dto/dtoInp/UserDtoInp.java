package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.UserAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoInp {

    private Long userID;
    private String userName;
    private String phone;
    private Boolean gender;
    private String userEmail;
    private UserAddress userAddress;

}
