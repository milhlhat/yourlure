package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
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
@Table(name = "tbl_Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Nullable
    @Column(name = "linkImage")
    private String linkImage;

    @JsonIgnore
    @Nullable
    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;

    @JsonIgnore
    @Nullable
    @ManyToOne
    @JoinColumn(name = "campaign", nullable = false)
    private Campaign campaign;
}
