package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.entity.Campaign;
import fpt.custome.yourlure.repositories.CampaignRepos;
import fpt.custome.yourlure.service.CampaignService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CampainServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepos campaignRepos;

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
    public Optional<CampaignDtoOut> getById(Long id) {

        //TODO: validate
        Optional<Campaign> campaign = campaignRepos.findById(id);
        if (campaign.isPresent()) {
            CampaignDtoOut campaignDtoOut = mapper.map(campaign.get(), CampaignDtoOut.class);
            return Optional.of(campaignDtoOut);
        }
        return Optional.empty();
    }
}
