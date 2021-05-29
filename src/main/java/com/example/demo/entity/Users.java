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
@Table(name = "tbl_Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long userID;

    @Nullable
    @Column(name = "userName")
    private String userName;

    @Nullable
    @Column(name = "password")
    private String password;

    @Nullable
    @Column(name = "phone")
    private String phone;

    @Nullable
    @Column(name = "gender")
    private boolean gender;

    @Nullable
    @Column(name = "userEmail")
    private String userEmail;

    @Nullable
    @Column(name = "maxCustomizable")
    private int maxCustomizable;

    @ManyToOne
    @JoinColumn(name = "roleID", nullable = false)
    private UserRoles userRoles;

    @ManyToOne
    @JoinColumn(name = "addressID", nullable = false)
    private UserAddress address;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<Customize> customizeCollection;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong UserAddress .
    //1 users có nhiều UserAddress
    private Collection<UserAddress> userAddressCollection;

}
