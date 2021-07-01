package fpt.custome.yourlure.dto.dtoInp;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryDtoInput {

    private Long categoryId;
    private String categoryName;

}
