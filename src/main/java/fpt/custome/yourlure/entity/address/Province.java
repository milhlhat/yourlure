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
@Table(name = "tbl_userProvince")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userProvinceID")
    private Long userProvinceID;

    @Nullable
    @Column(name = "userProvinceName")
    private String userProvinceName;

    @Nullable
    @Column(name = "type")
    private String type;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userCountryID", nullable = false)
    private Country userCountry;

    @JsonIgnore
    @OneToMany(mappedBy = "userProvince", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến userProvince ở trong UserDistrict.
    //1 UserProvince có nhiều UserDistrict
    private Collection<District> userDistrictCollection;

}