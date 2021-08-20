package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.CampaignRegisterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface CampaignService {

    List<CampaignDtoOut> getAll();

    Optional<AdminCampaignDtoOut> adminGetAll(String keyword, Pageable pageable);

    Optional<CampaignDtoOut> newest();

    Optional<CampaignDtoOut> getById(Long id);

    Optional<Boolean> update(Long id, AdminCampaignDtoInput adminCampaignDtoInput);

    Optional<Boolean> save( AdminCampaignDtoInput adminCampaignDtoInput);

    Optional<Boolean> delete(Long id);

    Object registerCampaign(CampaignRegisterDtoInput campaignRegisterDtoInput);

    Object adminGetAllRegister(String keyword,Long campaignId, Pageable pageable);

}
