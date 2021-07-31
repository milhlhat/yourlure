package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressInput {

    private String userName;
    @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
    @NotBlank(message = "phone can not contains black character!")
    private String phone;
    private String userEmail;
    private String description;
    private Long userWardId;

}

