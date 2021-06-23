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
@Table(name = "tbl_Customize")
public class Customize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customizeId")
    private Long customizeId;

    @Nullable
    @Column(name = "headColor")
    private String headColor;

    @Nullable
    @Column(name = "bodyColor")
    private String bodyColor;

    @Nullable
    @Column(name = "eyeColor")
    private String eyeColor;

    @Nullable
    @Column(name = "tailColor")
    private String tailColor;

    @Nullable
    @Column(name = "backColor")
    private String backColor;

    @Nullable
    @Column(name = "hookColor")
    private String hookColor;

    @Nullable
    @Column(name = "textureImg")
    private String textureImg;

    @Nullable
    @Column(name = "price")
    private Float price;

    @Nullable
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

}