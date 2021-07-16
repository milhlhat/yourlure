package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminSeasonController;
import fpt.custome.yourlure.dto.dtoInp.SeasonDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminSeasonDtoOutput;
import fpt.custome.yourlure.dto.dtoOut.SeasonDtoOutput;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminSeasonControllerImpl implements AdminSeasonController {

    @Autowired
    private SeasonService seasonService;

    @Override
    public ResponseEntity<Optional<AdminSeasonDtoOutput>> searchAll(Filter filter) {
        Optional<AdminSeasonDtoOutput> result = seasonService.adminGetAll(filter.getKeyword()
                , PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<SeasonDtoOutput>> getById(Long id) {
        Optional<SeasonDtoOutput> result = seasonService.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addFish(SeasonDtoInput seasonDtoInput) {
        Boolean result = seasonService.save(seasonDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> update(SeasonDtoInput seasonDtoInput, Long id) {
        Boolean result = seasonService.update(seasonDtoInput, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteFish(Long id) {
        Boolean result = seasonService.remove(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
