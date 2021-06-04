package com.example.demo.entity;

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
@Table(name = "tbl_Fish")
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fishID")
    private Long fishID;

    @Nullable
    @Column(name = "fishName")
    private String fishName;

//    @JsonIgnore
    /*
     * Chú thích cấp lớp (class) này có thể được sử dụng để loại trừ các thuộc tính nhất
     *  định trong quá trình Serialization and Deserialization dữ liệu JSON.
     * */
//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinTable(name = "fish_product", //Tạo ra một join Table tên là "fish_product"
//            joinColumns = @JoinColumn(name = "fishID"),  // TRong đó, khóa ngoại chính là address_id trỏ tới class hiện tại (Address)
//            inverseJoinColumns = @JoinColumn(name = "productID") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (Person)
//    )
//    private Collection<Products> productCollection;

    @OneToMany(mappedBy = "fish", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến fish ở trong tbl_fish.
    //1 fish có nhiều fish_product
    private Collection<Fish_product> fishCollection;
}
