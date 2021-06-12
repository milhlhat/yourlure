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
    private String userWardName;
    private String userDistrictName;
    private String userProvinceName;
    private String userCountryName;
    private String description;

}

