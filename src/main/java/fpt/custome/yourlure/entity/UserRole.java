package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_UserRoles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userRolesID")
    private Long userRolesID;

    @Nullable
    @Column(name = "roleName")
    private String roleName;

//    @JsonIgnore
//    @OneToMany(mappedBy = "userRole", cascade = CascadeType.ALL)
//    // MapopedBy trỏ tới tên biến roles ở trong Users.
//    //1 roles có nhiều Users
//    private Collection<User> userCollection;
}
