package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_Season")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seasonID")
    private Long seasonID;

    @Nullable
    @Column(name = "seasonName")
    private String seasonName;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "season_product",
            joinColumns = @JoinColumn(name = "seasonID"),
            inverseJoinColumns = @JoinColumn(name = "productID")
    )
    private Set<Product> products = new HashSet<>();
}
