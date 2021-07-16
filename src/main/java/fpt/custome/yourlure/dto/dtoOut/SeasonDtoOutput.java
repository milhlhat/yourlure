package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Product;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SeasonDtoOutput {

    private Long seasonId;
    private String seasonName;
    private Set<Product> products = new HashSet<>();

}
