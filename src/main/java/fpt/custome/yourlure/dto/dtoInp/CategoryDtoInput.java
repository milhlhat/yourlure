package fpt.custome.yourlure.dto.dtoInp;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryDtoInput {

    private Long categoryId;
    private String categoryName;

}
