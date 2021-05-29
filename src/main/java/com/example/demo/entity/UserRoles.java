package com.example.demo.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_UserRoles")
public class UserRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userRolesID")
    private Long userRolesID;

    @Nullable
    @Column(name = "roleName")
    private boolean roleName;

    @OneToMany(mappedBy = "userRoles", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến roles ở trong Users.
    //1 roles có nhiều Users
    private Collection<Users> usersCollection;
}
