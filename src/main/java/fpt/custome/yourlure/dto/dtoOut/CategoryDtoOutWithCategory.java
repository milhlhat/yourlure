package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDtoOutWithCategory {

    private Long categoryID;
    private String categoryName;
    private Collection<ProductsDtoOut> productCollection;
}