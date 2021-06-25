package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;

public interface CustomizeModelService {
    Boolean createCustomizeModel(CustomModelDto customModelDto);

    Boolean updateCustomizeModel(CustomModelDto customModelDto);

    Boolean deleteCustomizeModel(Long customizeModelId);

    List<CustomizeModelDtoOut> findCustomizeModelByUserId(Long userId);

}
