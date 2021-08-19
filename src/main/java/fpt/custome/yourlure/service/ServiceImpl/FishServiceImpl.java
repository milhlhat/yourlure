package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.FishDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminFishDtoOut;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.entity.Fish;
import fpt.custome.yourlure.repositories.FishRepos;
import fpt.custome.yourlure.service.FishService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private FishRepos fishRepos;

    @Autowired
    private ModelMapper mapper;

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

    @Override
    public Optional<AdminFishDtoOut> adminGetAll(String keyword, Pageable pageable) {
        List<FishDtoOut> fishDtoOuts = new ArrayList<>();
        try {
            Page<Fish> list = fishRepos.findByFishNameContainsIgnoreCase(keyword, pageable);
            for (Fish item : list) {
                FishDtoOut dtoOut = mapper.map(item, FishDtoOut.class);
                fishDtoOuts.add(dtoOut);
            }
            AdminFishDtoOut result = AdminFishDtoOut.builder()
                    .fishDtoOuts(fishDtoOuts)
                    .totalItem((int) list.getTotalElements())
                    .totalPage(list.getTotalPages())
                    .build();
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }

    }

    @Override
    public Optional<FishDtoOut> getById(Long id) {
        Optional<Fish> fishOptional = fishRepos.findById(id);
        if (fishOptional.isPresent()) {
            FishDtoOut result = mapper.map(fishOptional.get(), FishDtoOut.class);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Override
    public Object save(FishDtoInput fishDtoInput) {
        if (fishDtoInput != null) {
            if (fishRepos.findByFishNameContainsIgnoreCase(fishDtoInput.getFishName()).isPresent()) {
                throw new ValidationException("Tên cá này đã có!");
            }
            Fish fishInput = mapper.map(fishDtoInput, Fish.class);
            fishRepos.save(fishInput);
        } else {
            throw new ValidationException("fishDtoInput không được null");
        }
        return "Thêm cá thành công!";
    }

    @Override
    public Object update(FishDtoInput fishDtoInput, Long id) {

        if (id != null && fishDtoInput != null) {
            if (fishRepos.findByFishNameContainsIgnoreCase(fishDtoInput.getFishName()).isPresent()) {
                throw new ValidationException("Tên cá này đã có!");
            }
            Fish fishToUpdate = fishRepos.findById(id).get();
            fishToUpdate.setFishName(fishDtoInput.getFishName());
            fishRepos.save(fishToUpdate);
        } else {
            throw new ValidationException("fishDtoInput và id không được null");
        }
        return "cập nhật cá thành công!";
    }

    @Override
    public Boolean remove(Long id) {
        try {
            fishRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
