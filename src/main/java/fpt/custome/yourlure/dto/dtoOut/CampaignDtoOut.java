package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.CampaignRegister;
import fpt.custome.yourlure.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignDtoOut {

    private Long campaignId;
    private String description;
    private Date startDate;
    private Date endDate;
    private String banner;
    private String content;
    private Collection<Image> imageCollection;
    private Collection<CampaignRegister> campaignRegisterCollection;

}
