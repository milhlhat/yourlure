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
public class AdminCampaignRegisterDtoOutput {

    private Integer totalItem;
    private Integer totalPage;
    private List<CampaignRegisterDtoOutput> campaignDtoOuts;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CampaignRegisterDtoOutput {
        private Long campaignRegisterId;
        private String username;
        private String phone;
    }

}
