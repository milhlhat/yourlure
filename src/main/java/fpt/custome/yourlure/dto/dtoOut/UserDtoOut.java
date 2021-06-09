package fpt.custome.yourlure.dto.dtoOut;

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
    private String password;
    private String phone;
    private Boolean gender;
    private String userEmail;
    private Integer maxCustomizable;
    private List<String> role;

}
