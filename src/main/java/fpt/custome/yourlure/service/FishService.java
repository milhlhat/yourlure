package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.FishDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminFishDtoOut;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface FishService {

    //store front --------------------------------------
    List<FishDtoOut> getAll();

    //admin front --------------------------------------
    Optional<AdminFishDtoOut> adminGetAll(String keyword, Pageable pageable);

    Optional<FishDtoOut> getById(Long id);

    Boolean save(FishDtoInput fishDtoInput);

    Boolean update(FishDtoInput fishDtoInput, Long id);

    Boolean remove(Long id);

}
