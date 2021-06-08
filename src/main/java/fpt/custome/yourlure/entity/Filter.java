package fpt.custome.yourlure.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Filter {

    private String keyword;
    private int page;
    private int limit;
    private String sortBy;
    private Boolean isAsc;
//    private Pageable pageable;
}
