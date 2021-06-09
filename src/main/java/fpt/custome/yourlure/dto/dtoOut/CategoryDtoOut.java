package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDtoOut {

    private Long categoryID;
    private String categoryName;

}
