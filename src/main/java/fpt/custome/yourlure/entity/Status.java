package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_Status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "statusID")
    private Long statusID;

    @Nullable
    @Column(name = "statusName")
    private String statusName;



    @JsonIgnore
    @OneToMany(mappedBy = "status", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến category ở trong product.
    //1 category có nhiều product
    private Collection<Order> orders;

}
