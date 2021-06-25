package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoOut.OrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    //admin store ------------------------------
    List<OrderDtoOut> getAll(Pageable pageable);

    Optional<OrderDetailDtoOut> getById(Long id);

    Boolean remove(Long id);

}
