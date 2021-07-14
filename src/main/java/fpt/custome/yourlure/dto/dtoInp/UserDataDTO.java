package fpt.custome.yourlure.dto.dtoInp;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataDTO {

  @ApiModelProperty(position = 0)
  @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
  @NotBlank(message = "phone can not contains black character!")
  @NotNull
  private String phone;

  @ApiModelProperty(position = 1)
  @Size(min = 6, message = "Minimum password length: 6 characters")
  @NotBlank(message = "password can not contains black character!")
  @NotNull
  private String password;

}
