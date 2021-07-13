package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCampaignDtoInput {

    private String description;
    private Date startDate;
    private Date endDate;
    private String banner;
    private String content;
    private List<String> imageCollection;

}
