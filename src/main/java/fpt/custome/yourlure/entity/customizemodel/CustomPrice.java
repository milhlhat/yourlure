package fpt.custome.yourlure.entity.customizemodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_CustomPrice")
public class CustomPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customPriceId")
    private Long customPriceId;

    private String name;
    private String vnName;

    private Float price;

}
