package fpt.custome.yourlure.service;


import fpt.custome.yourlure.dto.dtoInp.AdminDiscountVoucherDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface DiscountVoucherService {

    Optional<AdminDiscountVoucherDtoOut> searchAll(String keyword, Pageable pageable);

    Boolean saveVoucher(AdminDiscountVoucherDtoInput discountVoucherDtoInput);

    Boolean updateVoucher(AdminDiscountVoucherDtoInput discountVoucherDtoInput, Long id);

    Boolean removeVoucher(Long id);

}
