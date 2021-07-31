package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminCampaignController;
import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminCampaignControllerImpl implements AdminCampaignController {

    @Autowired
    CampaignService campaignService;

    @Override
    public ResponseEntity<Object> adminGetAll(AdminFilterDtoInput filter) {
        Optional<AdminCampaignDtoOut> dtoOuts = campaignService.adminGetAll(filter.getKeyword(),
                PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> adminGetAllRegister(AdminFilterDtoInput filter) {
        Object dtoOuts = campaignService.adminGetAllRegister(filter.getKeyword(),
                PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> getById(Long id) {
        Optional<CampaignDtoOut> dtoOut = campaignService.getById(id);
        return new ResponseEntity<>(dtoOut, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> update(Long id, AdminCampaignDtoInput adminCampaignDtoInput) {
        Optional<Boolean> result = campaignService.update(id, adminCampaignDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> save(AdminCampaignDtoInput adminCampaignDtoInput) {
        Optional<Boolean> result = campaignService.save(adminCampaignDtoInput);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Object> delete(Long id) {
        Optional<Boolean> result = campaignService.delete(id);
        if (!result.get()) {
            new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
