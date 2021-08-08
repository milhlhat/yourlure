package fpt.custome.yourlure.controller.storefront;


import fpt.custome.yourlure.dto.dtoInp.AdminModel3dDtoInput;
import fpt.custome.yourlure.dto.dtoInp.CustomModelDtoInput;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RequestMapping(path = "/model3d")
public interface Model3dController {

    @PostMapping(value = "/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> createModel(@RequestBody Model3dDtoInput model3d);

    @PostMapping(value = "/update-model")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> update(@RequestBody AdminModel3dDtoInput adminModel3dDtoInput);

    @DeleteMapping(value = "/delete-model")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> deleteModel(@RequestParam Long modelId);


    @GetMapping(value = "/find-custom-by-id/{customId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> findCustomModelByCustomId(HttpServletRequest rq, @PathVariable(name = "customId") Long customId);

    @GetMapping(value = "/find-custom-by-product-id/{productId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> findCustomModelByProductId(HttpServletRequest rq, @PathVariable(name = "productId") Long productId);

    @GetMapping(value = "/custom-name-duplicate")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> isDuplicateCustomName(HttpServletRequest rq, @RequestParam String name);

    @PostMapping(value = "/create-custom")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${CustomizeModelController.create}", response = CustomModelDtoInput.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> createCustomModel(HttpServletRequest rq, @RequestBody CustomModelDtoInput customModelDtoInput);

    @PostMapping(value = "/update-custom")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> updateCustomModel(HttpServletRequest rq, @RequestBody CustomModelDtoInput customModelDtoInput);


    @GetMapping(value = "/get-model-by-product-id/{productId}")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Object> getModelByProductId(@PathVariable(name = "productId") Long productId);


    @GetMapping(value = "/get-model-by-model-id/{modelId}")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<Model3d> getModelByModelId(@PathVariable(name = "modelId") Long modelId);

    @GetMapping("/all-customize")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> getAllCustomizes(HttpServletRequest rq);

    @DeleteMapping("/delete-custom")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> deleteCustomize(HttpServletRequest rq, @RequestParam @Valid Long customizeId);

    @GetMapping("/customize-price")
    ResponseEntity<Object> getCustomizePrice();

}
