package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.CampaignRegisterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.entity.Campaign;
import fpt.custome.yourlure.entity.CampaignRegister;
import fpt.custome.yourlure.entity.Image;
import fpt.custome.yourlure.repositories.CampaignRegisterRepos;
import fpt.custome.yourlure.repositories.CampaignRepos;
import fpt.custome.yourlure.repositories.ImageRepos;
import fpt.custome.yourlure.service.CampaignService;
import fpt.custome.yourlure.service.FileService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.validation.ValidationException;
import java.util.*;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepos campaignRepos;

    @Autowired
    private CampaignRegisterRepos campaignRegisterRepos;

    @Autowired
    private ImageRepos imageRepos;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CampaignDtoOut> getAll() {
        List<CampaignDtoOut> result = new ArrayList<>();
        List<Campaign> list = campaignRepos.findAllOrderByEndDate();
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
        List<CampaignDtoOut> campaignDtoOuts = new ArrayList<>();
        for (Campaign item : list) {
            CampaignDtoOut dtoOut = mapper.map(item, CampaignDtoOut.class);
            campaignDtoOuts.add(dtoOut);
        }
        result.setTotalItem(list.getTotalPages());
        result.setTotalPage(list.getTotalPages());
        result.setCampaignDtoOuts(campaignDtoOuts);
        return Optional.of(result);
    }

    @Override
    public CampaignDtoOut newest() {
        Optional<Campaign> campaign = campaignRepos.findNewest();
        if(campaign.isPresent()){
            CampaignDtoOut dtoOut = mapper.map(campaign.get(), CampaignDtoOut.class);
            return dtoOut;
        }

        throw new ValidationException("Không tìm thấy campain nào!");
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

    @Transactional
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

                //add new image
                for (String link : adminCampaignDtoInput.getImageCollection()) {
                    Image image = Image.builder()
                            .campaign(Campaign.builder().campaignId(idInput).build())
                            .linkImage(link)
                            .build();
                    objUpdate.getImageCollection().add(image);
                }
                fileService.deleteFiles((adminCampaignDtoInput.getImageCollectionRemove()));
                campaignRepos.save(objUpdate);
                //delete image
                for (String link : adminCampaignDtoInput.getImageCollectionRemove()) {
                    imageRepos.deleteByLinkImage(link.trim());
                }
                return Optional.of(true);
            } else {
                return Optional.of(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.of(false);
    }


    @Transactional
    @Override
    public Optional<Boolean> save(AdminCampaignDtoInput adminCampaignDtoInput) {
        Campaign campaign;
        if (adminCampaignDtoInput != null) {
            campaign = mapper.map(adminCampaignDtoInput, Campaign.class);
            Campaign campaignSaved = campaignRepos.save(campaign);

            if (adminCampaignDtoInput.getImageCollection() != null) {
                //add list image product
                List<String> imageLink = adminCampaignDtoInput.getImageCollection();
                for (String link : imageLink) {
                    Image image = Image.builder()
                            .campaign(campaignSaved)
                            .linkImage(link)
                            .build();
                    imageRepos.save(image);
                }
            }
            return Optional.of(true);
        } else return Optional.of(false);
    }

    @Transactional
    @Override
    public Optional<Boolean> delete(Long id) {
        try {
            Optional<Campaign> campaign = campaignRepos.findById(id);

            //check id is present
            if (campaign.isPresent()) {
                if (campaign.get().getStartDate() == null || campaign.get().getEndDate() == null ||
                        (campaign.get().getStartDate().compareTo(new Date()) < 0 &&
                                campaign.get().getEndDate().compareTo(new Date()) > 0)
                ) {
                    // the voucher is not start
                    return Optional.of(false);
                } else {
                    campaignRepos.deleteById(id);
                    return Optional.of(true);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            Optional.of(false);
        }
        return Optional.of(false);
    }

    @Override
    public Object registerCampaign(CampaignRegisterDtoInput campaignRegisterDtoInput) {
        if (campaignRegisterDtoInput != null) {
            CampaignRegister campaignRegister = mapper.map(campaignRegisterDtoInput, CampaignRegister.class);
            campaignRegister.setCampaign(Campaign.builder().campaignId(campaignRegisterDtoInput.getCampaignId()).build());
            campaignRegisterRepos.save(campaignRegister);
        } else {
            return "Data input is null!";
        }
        return "Đăng ký tham gia thành công!";
    }
}
