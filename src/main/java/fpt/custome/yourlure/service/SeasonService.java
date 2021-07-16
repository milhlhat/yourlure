package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.SeasonDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminSeasonDtoOutput;
import fpt.custome.yourlure.dto.dtoOut.SeasonDtoOutput;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SeasonService {

    //store front --------------------------------------
    List<SeasonDtoOutput> getAll();

    //admin front --------------------------------------
    Optional<AdminSeasonDtoOutput> adminGetAll(String keyword,Pageable pageable);

    Optional<SeasonDtoOutput> getById(Long id);

    Boolean save(SeasonDtoInput seasonDtoInput);

    Boolean update(SeasonDtoInput seasonDtoInput, Long id);

    Boolean remove(Long id);

}
