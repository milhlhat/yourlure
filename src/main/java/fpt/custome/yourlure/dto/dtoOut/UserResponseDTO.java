package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Role;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;
@Data
public class UserResponseDTO {

  @ApiModelProperty(position = 0)
  private Long id;
  @ApiModelProperty(position = 1)
  private String username;
  @ApiModelProperty(position = 2)
  private String phone;
  @ApiModelProperty(position = 3)
  private String email;
  @ApiModelProperty(position = 4)
  List<Role> roles;



}
