package fpt.custome.yourlure.dto.dtoOut;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminFishDtoOut {

    private Integer totalItem;
    private Integer totalPage;
    private List<FishDtoOut> fishDtoOuts;

}
