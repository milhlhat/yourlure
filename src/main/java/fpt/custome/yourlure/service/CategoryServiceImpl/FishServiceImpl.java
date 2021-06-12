package fpt.custome.yourlure.service.CategoryServiceImpl;

import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.entity.Fish;
import fpt.custome.yourlure.repositories.FishRepos;
import fpt.custome.yourlure.service.FishService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private FishRepos fishRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

    @Override
    public List<FishDtoOut> getAll() {
        List<FishDtoOut> result = new ArrayList<>();
        List<Fish> list = fishRepos.findAll();
        for (Fish item : list) {
            FishDtoOut dtoOut = mapper.map(item, FishDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }
}
