package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDtoOut {

    private Long userId;
    private String username;
    private String phone;
    private Boolean gender;
    private String userEmail;
    private Boolean enabled;
    private Integer numberOfOrder;
    private Integer totalProduct;

}
