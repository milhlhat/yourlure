package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.entity.Campaign;
import fpt.custome.yourlure.entity.Image;
import fpt.custome.yourlure.repositories.CampaignRepos;
import fpt.custome.yourlure.repositories.ImageRepos;
import fpt.custome.yourlure.service.CampaignService;
import fpt.custome.yourlure.service.FileService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepos campaignRepos;

    @Autowired
    private ImageRepos imageRepos;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CampaignDtoOut> getAll() {
        List<CampaignDtoOut> result = new ArrayList<>();
        List<Campaign> list = campaignRepos.findAll();
        for (Campaign item : list) {
            CampaignDtoOut dtoOut = mapper.map(item, CampaignDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Optional<AdminCampaignDtoOut> adminGetAll(String keyword, Pageable pageable) {
        Page<Campaign> list = campaignRepos.findByBannerContainsIgnoreCase(keyword, pageable);
        AdminCampaignDtoOut result = AdminCampaignDtoOut.builder().build();
        for (Campaign item : list) {
            CampaignDtoOut dtoOut = mapper.map(item, CampaignDtoOut.class);
            result.getCampaignDtoOuts().add(dtoOut);
        }
        result.setTotalItem(list.getTotalPages());
        result.setTotalPage(list.getTotalPages());
        return Optional.of(result);
    }

    @Override
    public Optional<CampaignDtoOut> getById(Long id) {

        //TODO: validate
        Optional<Campaign> campaign = campaignRepos.findById(id);
        if (campaign.isPresent()) {
            CampaignDtoOut campaignDtoOut = mapper.map(campaign.get(), CampaignDtoOut.class);
            return Optional.of(campaignDtoOut);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Boolean> update(Long idInput, AdminCampaignDtoInput adminCampaignDtoInput) {
        try {
            Campaign objUpdate = campaignRepos.findById(idInput).get();
            if (idInput != null && adminCampaignDtoInput != null && objUpdate != null) {
                objUpdate.setBanner(adminCampaignDtoInput.getBanner());
                objUpdate.setContent(adminCampaignDtoInput.getContent());
                objUpdate.setDescription(adminCampaignDtoInput.getDescription());
                objUpdate.setStartDate(adminCampaignDtoInput.getStartDate());
                objUpdate.setEndDate(adminCampaignDtoInput.getEndDate());
                imageRepos.deleteByCampaign_CampaignId(idInput);
                fileService.deleteFiles((List<String>) adminCampaignDtoInput.getImageCollection());
                for (String link : adminCampaignDtoInput.getImageCollection()) {
                    Image image = Image.builder()
                            .campaign(Campaign.builder().campaignId(idInput).build())
                            .linkImage(link)
                            .build();
                    objUpdate.getImageCollection().add(image);
                    campaignRepos.save(objUpdate);
                    return Optional.of(true);
                }
            } else {
                return Optional.of(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.of(false);
        }
        return Optional.of(true);
    }

    @Override
    public Optional<Boolean> save(AdminCampaignDtoInput adminCampaignDtoInput) {
        Campaign campaign;
        if (adminCampaignDtoInput != null) {
            campaign = mapper.map(adminCampaignDtoInput, Campaign.class);
            if (!adminCampaignDtoInput.getImageCollection().isEmpty()){
                //add list image product
                List<String> imageLink = (List<String>) adminCampaignDtoInput.getImageCollection();
                for (String link : imageLink) {
                    Image image = Image.builder()
                            .campaign(campaign)
                            .linkImage(link)
                            .build();
                    imageRepos.save(image);
                }
            }
            campaignRepos.save(campaign);
            return Optional.of(true);
        } else return Optional.of(false);
    }
}
