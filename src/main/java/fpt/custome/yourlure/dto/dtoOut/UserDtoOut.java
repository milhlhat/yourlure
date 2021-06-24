package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoOut {

    private Long userID;
    private String userName;
    private String phone;
    private Boolean gender;
    private String userEmail;
    private String note;
    private Integer maxCustomizable;
    List<Role> roles;

}
