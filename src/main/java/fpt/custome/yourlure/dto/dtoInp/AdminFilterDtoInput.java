package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminFilterDtoInput {

    private String keyword;
    private String typeName;
    private int page;
    private int limit;
    private String sortBy;
    private Boolean isAsc;
}
