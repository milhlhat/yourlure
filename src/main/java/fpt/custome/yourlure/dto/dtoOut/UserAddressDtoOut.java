package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressDtoOut {

    private Long userAddressID;
    private String userName;
    private String phone;
    private String userEmail;
    private String userWardName;
    private Long userWardId;
    private String userDistrictName;
    private Long userDistrictId;
    private String userProvinceName;
    private Long userProvinceId;
    private String description;

}

