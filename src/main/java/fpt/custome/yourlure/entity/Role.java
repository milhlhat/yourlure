package fpt.custome.yourlure.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  ROLE_ADMIN,ROLE_STAFF, ROLE_CUSTOMER;

  public String getAuthority() {
    return name();
  }

}
