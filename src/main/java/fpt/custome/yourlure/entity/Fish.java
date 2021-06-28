package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Fish")
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishId")
    private Long fishId;

    @Nullable
    @Column(name = "fishName")
    private String fishName;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(name = "tbl_fish_product", //Tạo ra một join Table tên là "fish_product"
            joinColumns = @JoinColumn(name = "fishId"),  // TRong đó, khóa ngoại chính là address_id trỏ tới class hiện tại (Address)
            inverseJoinColumns = @JoinColumn(name = "productId") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (Person)
    )
    private Collection<Product> products = new HashSet<>();


    /**
     * add product to fish
     *
     * @param p
     */
    public void addProduct(Product p) {
        this.products.add(p);
        p.getFishList().add(this);
    }

    /**
     * remove product on fish
     *
     * @param p
     */
    public void removeProduct(Product p) {
        this.products.remove(p);
        p.getFishList().remove(this);
    }

//    public void removeByProductId(Long id) {
//        if (!this.getProducts().isEmpty()) {
//            for (Iterator<Product> iter = this.getProducts().listIterator(); iter.hasNext(); ) {
//                Product a = iter.next();
//                if (a.getProductId() == id) {
//                    iter.remove();
//                }
//            }
//        }
//    }

}
