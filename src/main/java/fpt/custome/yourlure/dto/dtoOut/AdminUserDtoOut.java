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
public class AdminUserDtoOut {

    private Integer totalUser;
    private Integer totalPage;
    private List<UserDtoOut> userDtoOutList;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDtoOut {
        private Long userId;
        private String username;
        private String phone;
        private Boolean gender;
        private String userEmail;
        private Boolean enabled;
        private Integer numberOfOrder;
    }


}
