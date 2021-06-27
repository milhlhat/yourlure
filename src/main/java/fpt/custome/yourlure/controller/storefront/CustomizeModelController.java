package fpt.custome.yourlure.controller.storefront;


import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@RequestMapping(path = "/customize-model")
public interface CustomizeModelController {

    @PostMapping(value = "/create")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${CustomizeModelController.create}", response = CustomModelDto.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<CustomizeModel> createModel(HttpServletRequest rq, @RequestBody CustomModelDto customModelDto);
}
