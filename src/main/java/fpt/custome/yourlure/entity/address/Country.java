package fpt.custome.yourlure.entity.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "tbl_userCountry")
public class Country {

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
    private Collection<Province> userProvinceCollection;
}