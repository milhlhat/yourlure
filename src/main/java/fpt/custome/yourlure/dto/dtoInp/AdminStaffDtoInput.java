package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminStaffDtoInput {
    private String username;
    private String phone;
    private Boolean gender;
    private Boolean enabled;
    Set<Role> roles;
}
