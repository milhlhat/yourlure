package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminFilterDtoInput {

    private String keyword;
    private String typeSearch;
    private Long idSearch;
    private int page;
    @Min(1)
    private int limit;
    private String sortBy;
    private Boolean isAsc;
}
