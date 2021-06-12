package fpt.custome.yourlure.entity.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import fpt.custome.yourlure.entity.UserAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_userWard")
public class Ward {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userWardID")
    private Long userWardID;

    @Nullable
    @Column(name = "userWardName")
    private String userWardName;

    @Nullable
    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "districtID", nullable = false)
    private District userDistrict;

    @JsonIgnore
    @OneToMany(mappedBy = "ward", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến userWard ở trong UserAddress.
    //1 userWard có nhiều UserAddress
    private Collection<UserAddress> userAddressCollection;
}