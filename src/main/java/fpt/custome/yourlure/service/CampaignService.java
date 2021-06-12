package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;

import java.util.List;
import java.util.Optional;


public interface CampaignService {

    List<CampaignDtoOut> getAll();

    Optional<CampaignDtoOut> getById(Long id);

}
