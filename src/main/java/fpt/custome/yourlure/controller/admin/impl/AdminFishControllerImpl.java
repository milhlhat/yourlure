package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminFishController;
import fpt.custome.yourlure.dto.dtoInp.FishDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminFishDtoOut;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminFishControllerImpl implements AdminFishController {

    @Autowired
    private FishService fishService;

    @Override
    public ResponseEntity<Optional<AdminFishDtoOut>> searchAll(Filter filter) {
        Optional<AdminFishDtoOut> result = fishService.adminGetAll(filter.getKeyword()
                , PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<FishDtoOut>> getById(Long id) {
        Optional<FishDtoOut> result = fishService.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addFish(FishDtoInput fishDtoInput) {
        Boolean result = fishService.save(fishDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> update(FishDtoInput fishDtoInput, Long id) {
        Boolean result = fishService.update(fishDtoInput, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteFish(Long id) {
        Boolean result = fishService.remove(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

