package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDtoOut {

    private Long categoryID;
    private String categoryName;
    private Collection<Product> productCollection;

}
