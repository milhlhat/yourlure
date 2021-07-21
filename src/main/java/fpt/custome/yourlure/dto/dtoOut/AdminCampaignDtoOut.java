package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCampaignDtoOut {

    private Integer totalItem;
    private Integer totalPage;
    private List<CampaignDtoOut> campaignDtoOuts;

}