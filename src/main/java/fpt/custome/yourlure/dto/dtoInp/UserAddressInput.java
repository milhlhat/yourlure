package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressInput {

    private Long userAddressID;
    private String userName;
    private String phone;
    private String userEmail;
    private String description;
    private Long wardId;

}

