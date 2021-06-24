package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FishDtoInput {

    private Long fishId;
    private Set<Product> products = new HashSet<>();

}
