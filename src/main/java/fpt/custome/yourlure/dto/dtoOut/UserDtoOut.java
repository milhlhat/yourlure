package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Customize;
import fpt.custome.yourlure.entity.UserAddress;
import fpt.custome.yourlure.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoOut {

    private Long userID;
    private String userName;
    private String password;
    private String phone;
    private Boolean gender;
    private String userEmail;
    private Integer maxCustomizable;
    private UserRole userRole;
    private Collection<Customize> customizeCollection;
    private Collection<UserAddress> userAddressCollection;

}
