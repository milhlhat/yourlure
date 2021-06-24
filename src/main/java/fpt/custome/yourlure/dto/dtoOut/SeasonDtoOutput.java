package fpt.custome.yourlure.dto.dtoOut;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SeasonDtoOutput {

    private Long seasonId;
    private String seasonName;

}
