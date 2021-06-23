package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Long userId;

    @Nullable
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    @Column(name = "userName", unique = true, nullable = false)
    private String username;

    @Nullable
    @Column(name = "password")
    @Size(min = 8, message = "Minimum password length: 8 characters")
    private String password;

    @Nullable
    @Column(name = "phone")
    @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
    private String phone;

    @Nullable
    @Column(name = "gender")
    private Boolean gender;

    @Nullable
    @Column(name = "userEmail", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "enabled")
    private Boolean enabled;

    @Nullable
    @Column(name = "maxCustomizable", columnDefinition = "integer default 5")
    private Integer maxCustomizable;

    @Nullable
    @Column(name = "note")
    private String note;

    @ElementCollection(fetch = FetchType.EAGER)
    List<Role> roles;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến user ở trong status.
    //1 user có nhiều status
    private Collection<Status> statusCollection;

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

    public void update(User userUpdate){
        setUsername(userUpdate.getUsername());
        setUsername(userUpdate.getUsername());
        setPhone(userUpdate.getPhone());
        setEnabled(userUpdate.getEnabled());
        setUserEmail(userUpdate.getUserEmail());
        setProvider(userUpdate.getProvider());
        setMaxCustomizable(userUpdate.getMaxCustomizable());
        setGender(userUpdate.getGender());
        setRoles(userUpdate.getRoles());
        setUserAddressCollection(userUpdate.getUserAddressCollection());
        setUserAddressCollection(userUpdate.getUserAddressCollection());
        setPassword(userUpdate.getPassword());
    }


}