package fpt.custome.yourlure.controller.admin.impl;


import fpt.custome.yourlure.controller.admin.AdminUserController;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminUserControllerImpl implements AdminUserController {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<Optional<AdminUserDtoOut>> getAll(AdminFilterDtoInput filter) {
        Optional<AdminUserDtoOut> result = userService.adminFindAll(filter.getKeyword(),
                filter.getTypeName(), PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminUserDetailDtoOut>> getUser(Long id) {
        Optional<AdminUserDetailDtoOut> result = userService.getUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> block(Long id) {
        Boolean result = userService.block(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
