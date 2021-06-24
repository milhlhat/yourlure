package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Provider;
import fpt.custome.yourlure.entity.Role;
import fpt.custome.yourlure.entity.UserAddress;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Collection;
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
  private Collection<UserAddress> userAddressCollection;
  @ApiModelProperty(position = 5)
  private Boolean gender;
  @ApiModelProperty(position = 6)
  private Integer maxCustomizable;
  @ApiModelProperty(position = 7)
  private Provider provider;

  @ApiModelProperty(position = 7)
  List<Role> roles;



}
