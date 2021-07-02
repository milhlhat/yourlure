package fpt.custome.yourlure.controller.storefront;


import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping(path = "/model3d")
public interface Model3dController {

    @PostMapping(value = "/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Model3d> createModel(@RequestBody Model3dDtoInput model3d);


    @PostMapping(value = "/create-custom")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${CustomizeModelController.create}", response = CustomModelDto.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<CustomizeModel> createCustomModel(HttpServletRequest rq, @RequestBody CustomModelDto customModelDto);

    @PostMapping(value = "/update-custom")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<CustomizeModel> updateCustomModel(HttpServletRequest rq, @RequestBody CustomModelDto customModelDto);


    @GetMapping(value = "/get-model-by-product-id/{productId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Model3d> getModelByProductId(@PathVariable(name = "productId") Long productId);


    @GetMapping(value = "/get-model-by-model-id/{modelId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Model3d> getModelByModelId(@PathVariable(name = "modelId") Long modelId);

}
