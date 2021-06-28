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
@Table(name = "tbl_userDistrict")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userDistrictID")
    private Long userDistrictID;

    @Nullable
    @Column(name = "userDistrictName")
    private String userDistrictName;

    @Nullable
    @Column(name = "type")
    private String type;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userProvinceID", nullable = false)
    private Province userProvince;

    @JsonIgnore
    @OneToMany(mappedBy = "userDistrict", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến userDistrict ở trong UserWard.
    //1 UserDistrict có nhiều UserWard
    private Collection<Ward> userWardCollection;

}