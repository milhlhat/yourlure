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
@Table(name = "tbl_UserAddress")
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userAddressID")
    private Long userAddressID;

    @Nullable
    @Column(name = "description")
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "wardID", nullable = false)
    private UserWard userWard;


    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name = "tbl_UserWard")
    class UserWard {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "userWardID")
        private Long userWardID;

        @Nullable
        @Column(name = "userWardCode")
        private String userWardCode;

        @Nullable
        @Column(name = "userWardName")
        private String userWardName;

        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "districtID", nullable = false)
        private UserDistrict userDistrict;

        @JsonIgnore
        @OneToMany(mappedBy = "userWard", cascade = CascadeType.ALL)
        // MapopedBy trỏ tới tên biến userWard ở trong UserAddress.
        //1 userWard có nhiều UserAddress
        private Collection<UserAddress> userAddressCollection;

    }

    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name = "tbl_UserDistrict")
    class UserDistrict {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "userDistrictID")
        private Long userDistrictID;

        @Nullable
        @Column(name = "userDistrictCode")
        private String userDistrictCode;

        @Nullable
        @Column(name = "userDistrictName")
        private String userDistrictName;

        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "userProvinceID", nullable = false)
        private UserProvince userProvince;

        @JsonIgnore
        @OneToMany(mappedBy = "userDistrict", cascade = CascadeType.ALL)
        // MapopedBy trỏ tới tên biến userDistrict ở trong UserWard.
        //1 UserDistrict có nhiều UserWard
        private Collection<UserWard> userWardCollection;

    }

    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name = "UserProvince")
    class UserProvince {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "userProvinceID")
        private Long userProvinceID;

        @Nullable
        @Column(name = "userProvinceCode")
        private String userProvinceCode;

        @Nullable
        @Column(name = "userProvinceName")
        private String userProvinceName;

        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "userCountryID", nullable = false)
        private UserCountry userCountry;

        @JsonIgnore
        @OneToMany(mappedBy = "userProvince", cascade = CascadeType.ALL)
        // MapopedBy trỏ tới tên biến userProvince ở trong UserDistrict.
        //1 UserProvince có nhiều UserDistrict
        private Collection<UserDistrict> userDistrictCollection;

    }

    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name = "tbl_UserCountry")
    class UserCountry {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "userCountryID")
        private Long userCountryID;

        @Nullable
        @Column(name = "userCountryCode")
        private String userCountryCode;

        @Nullable
        @Column(name = "userCountryName")
        private String userCountryName;

        @JsonIgnore
        @OneToMany(mappedBy = "userCountry", cascade = CascadeType.ALL)
        // MapopedBy trỏ tới tên biến userCountry ở trong UserProvince.
        //1 UserCountry có nhiều UserProvince
        private Collection<UserProvince> userProvinceCollection;

    }

}
