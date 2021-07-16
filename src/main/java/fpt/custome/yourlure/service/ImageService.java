package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.ImageDtoInput;

import java.util.Optional;

public interface ImageService {

    Optional<Object> addImage(ImageDtoInput imageDtoInput);

    Optional<Object> delete(Long imageId);

    Optional<Object> update(ImageDtoInput imageDtoInput, Long id);
}
