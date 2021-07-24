package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
@Builder
@Table(name = "tbl_campaign_register")
@NoArgsConstructor
@AllArgsConstructor
public class CampaignRegister {

    @Id
    @Column(name = "campaignRegisterId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campaignRegisterId;

    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @NotBlank(message = "phone can not contains black character!")
    @Column(name = "phone")
    @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
    private String phone;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "campaignId", nullable = false)
    private Campaign campaign;

}
