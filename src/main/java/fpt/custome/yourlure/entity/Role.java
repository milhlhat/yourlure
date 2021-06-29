package fpt.custome.yourlure.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER;

    public String getAuthority() {
        return name();
    }

//    public static boolean contains(String test) {
//
//        for (Choice c : Choice.values()) {
//            if (c.name().equals(test)) {
//                return true;
//            }
//        }
//
//        return false;
//    }

}
