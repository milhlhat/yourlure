package fpt.custome.yourlure.entity.customizemodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.custome.yourlure.entity.User;
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
@Table(name = "tbl_Customize")
public class CustomizeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customizeId")
    private Long customizeId;

    private String name;

    private String thumbnailUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model3d model3d;

    @JsonIgnore
    @OneToMany(mappedBy = "customizeModel", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<MaterialValue> materialValues;


}
