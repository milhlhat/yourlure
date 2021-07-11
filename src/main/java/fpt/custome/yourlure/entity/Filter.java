package fpt.custome.yourlure.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Filter {

    private String keyword;
    private Boolean custom;
    private int page;
    @Min(1)
    private int limit;
    private String sortBy;
    private Boolean isAsc;
    private List<Long> listCateId;
    private List<Long> listFishId;

}
