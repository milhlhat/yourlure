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
public class AdminStaffDtoOut {

    private Integer totalUser;
    private Integer totalPage;
    private List<StaffDtoOut> userDtoOutList;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StaffDtoOut {
        private Long userId;
        private String username;
        private String phone;
        private Boolean gender;
        private Boolean enabled;
        List<Role> roles;

    }


}
