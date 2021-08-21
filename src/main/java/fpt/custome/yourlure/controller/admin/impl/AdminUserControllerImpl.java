package fpt.custome.yourlure.controller.admin.impl;


import fpt.custome.yourlure.controller.admin.AdminUserController;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminStaffDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminStaffDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminUserControllerImpl implements AdminUserController {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<Optional<AdminUserDtoOut>> getAll(AdminFilterDtoInput filter) {
        Optional<AdminUserDtoOut> result = userService.adminFindAll(filter.getKeyword(),
                filter.getTypeSearch(), PageRequest.of(filter.getPage(),
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
    public ResponseEntity<List<UserAddressDtoOut>> getAddressUser(Long id) {
        List<UserAddressDtoOut> result = userService.adminGetAddressUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> switchStatus(Long id) {
        Boolean result = userService.switchStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminStaffDtoOut>> allStaff(AdminFilterDtoInput filter) {
        Optional<AdminStaffDtoOut> result = userService.adminStaffAll(filter.getKeyword(),
                filter.getTypeSearch(), PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminStaffDtoOut.StaffDtoOut>> staffGetById(Long id) {
        Optional<AdminStaffDtoOut.StaffDtoOut> result = userService.staffGetById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> staffUpdateById(AdminStaffDtoInput adminStaffDtoInput, Long id) {
        try {
            userService.staffUpdateById(adminStaffDtoInput, id);

        } catch (ValidationException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Object> staffSave(AdminStaffDtoInput adminStaffDtoInput) {
        try {
            userService.staffSave(adminStaffDtoInput);

        } catch (ValidationException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);

    }


}
