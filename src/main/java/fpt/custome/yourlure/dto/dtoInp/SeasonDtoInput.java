package fpt.custome.yourlure.dto.dtoInp;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SeasonDtoInput {

    private Long seasonId;
    private String seasonName;

}
