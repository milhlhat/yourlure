package fpt.custome.yourlure.controller.admin.impl;


import fpt.custome.yourlure.controller.admin.AdminUserController;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminUserControllerImpl implements AdminUserController {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<List<AdminUserDtoOut>> getAll(Filter filter) {
        List<AdminUserDtoOut> result = userService.adminFindAll(PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserDtoOut>> search(Filter filter) {
        return null;
    }

    @Override
    public ResponseEntity<Optional<UserDtoOut>> getOrderById(Long id) {
        return null;
    }


    @Override
    public ResponseEntity<Optional<UserDtoOut>> editOrder(Long id, UserDtoOut userDtoOut) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> deleteOrder(Long id) {
        return null;
    }
}
