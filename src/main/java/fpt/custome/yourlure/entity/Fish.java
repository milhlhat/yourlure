package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Fish")
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishID")
    private Long fishID;

    @Nullable
    @Column(name = "fishName")
    private String fishName;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "tbl_fish_product", //Tạo ra một join Table tên là "fish_product"
            joinColumns = @JoinColumn(name = "fishID"),  // TRong đó, khóa ngoại chính là address_id trỏ tới class hiện tại (Address)
            inverseJoinColumns = @JoinColumn(name = "productID") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (Person)
    )
    private Set<Product> products = new HashSet<>();

//    @JsonIgnore
//    @OneToMany(mappedBy = "fish", cascade = CascadeType.ALL)
//    // MapopedBy trỏ tới tên biến fish ở trong tbl_fish.
//    //1 fish có nhiều fish_product
//    private Collection<Fish_product> fishCollection;
}
