package fpt.custome.yourlure.entity.customizemodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "tbl_CustomType")
public class CustomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "materialId")
    private Long materialId;

    private String name;
    private Float price;

    @JsonIgnore
    @OneToMany(mappedBy = "customType", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<MaterialValue> MaterialValues;
}
