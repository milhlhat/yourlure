package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Role;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class UserDataDTO {
  
  @ApiModelProperty(position = 0)
  private String username;
  @ApiModelProperty(position = 1)
  private String phone;
  @ApiModelProperty(position = 2)
  private String userEmail;
  @ApiModelProperty(position = 3)
  private String password;
  @ApiModelProperty(position = 4)
  List<Role> roles;



}
