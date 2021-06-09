package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import fpt.custome.yourlure.security.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long userID;

    @Nullable
    @Column(name = "userName")
    private String username;

    @Nullable
    @Column(name = "password")
    private String password;

    @Nullable
    @Column(name = "phone")
    private String phone;

    @Nullable
    @Column(name = "gender")
    private Boolean gender;

    @Nullable
    @Column(name = "userEmail")
    private String userEmail;

    @Nullable
    @Column(name = "statusActivity")
    private Boolean statusActivity;

    @Nullable
    @Column(name = "maxCustomizable")
    private Integer maxCustomizable;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "roleID", nullable = false)
//    private UserRole userRole;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "userRolesID")
    )
    private Set<UserRole> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<Customize> customizeCollection;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong UserAddress .
    //1 users có nhiều UserAddress
    private Collection<UserAddress> userAddressCollection;

}
