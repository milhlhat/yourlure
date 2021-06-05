package com.example.demo.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductOutPageable {

    private int page;
    private int totalPage;
    private List<ProductsDtoOut> listResult = new ArrayList<>();
}
