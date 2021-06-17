package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Data
@Entity
@Builder
@Table(name = "tbl_Campaign")
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {

    @Id
    @Column(name = "campaignId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campaignId;

    @Nullable
    @Column(name = "description", columnDefinition="TEXT")
    private String description;

    @Nullable
    @Column(name = "startDate")
    private Date startDate;

    @Nullable
    @Column(name = "endDate")
    private Date endDate;

    @Nullable
    @Column(name = "banner")
    private String banner;

    @JsonIgnore
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến campaign ở trong image.
    //1 campaign có nhiều image
    private Collection<Image> imageCollection;
}
