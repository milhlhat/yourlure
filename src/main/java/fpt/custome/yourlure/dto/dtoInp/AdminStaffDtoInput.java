package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminStaffDtoInput {
    private String username;
    private String phone;
    @NotNull
    private Boolean gender;
    @NotNull
    private Boolean enabled;
    @NotNull
    Set<Role> roles;
}
