package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.SeasonDtoInput;
import fpt.custome.yourlure.dto.dtoOut.SeasonDtoOutput;
import fpt.custome.yourlure.entity.Season;
import fpt.custome.yourlure.repositories.SeasonRepos;
import fpt.custome.yourlure.service.SeasonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SeasonServiceImpl implements SeasonService {

    @Autowired
    private SeasonRepos seasonRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<SeasonDtoOutput> getAll() {
        List<SeasonDtoOutput> result = new ArrayList<>();
        List<Season> list = seasonRepos.findAll();
        for (Season item : list) {
            SeasonDtoOutput dtoOut = mapper.map(item, SeasonDtoOutput.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public List<SeasonDtoOutput> adminGetAll(Pageable pageable) {
        List<SeasonDtoOutput> results = new ArrayList<>();
        try {
            Page<Season> list = seasonRepos.findAll(pageable);
            for (Season item : list) {
                SeasonDtoOutput dtoOut = mapper.map(item, SeasonDtoOutput.class);
                results.add(dtoOut);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    @Override
    public Optional<SeasonDtoOutput> getById(Long id) {
        Optional<Season> optional = seasonRepos.findById(id);
        if (optional.isPresent()) {
            SeasonDtoOutput result = mapper.map(optional.get(), SeasonDtoOutput.class);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Override
    public Boolean save(SeasonDtoInput seasonDtoInput) {
        try {
            Season seasonInput = mapper.map(seasonDtoInput, Season.class);
            seasonRepos.save(seasonInput);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean update(SeasonDtoInput seasonDtoInput, Long id) {
        try {
            if (id != null && seasonDtoInput != null) {
                Season seasonToUpdate = seasonRepos.findById(id).get();
                seasonToUpdate.builder()
                        .seasonName(seasonDtoInput.getSeasonName())
                        .build();
                seasonRepos.save(seasonToUpdate);
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean remove(Long id) {
        try {
            seasonRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
