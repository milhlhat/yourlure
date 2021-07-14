package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AdminDiscountVoucherDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDtoOut;
import fpt.custome.yourlure.entity.DiscountVoucher;
import fpt.custome.yourlure.repositories.DiscountVoucherRepos;
import fpt.custome.yourlure.service.DiscountVoucherService;
import fpt.custome.yourlure.utils.RandomString;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DiscountVoucherServiceImpl implements DiscountVoucherService {

    @Autowired
    private DiscountVoucherRepos discountVoucherRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Optional<AdminDiscountVoucherDtoOut> searchAll(String keyword, Pageable pageable) {

        List<AdminDiscountVoucherDtoOut.DiscountVoucherDtoOut> adminDiscountVoucherDtoOuts = new ArrayList<>();
        try {
            Page<DiscountVoucher> list = discountVoucherRepos.searchAll("%"+keyword.trim()+"%", pageable);
            for (DiscountVoucher item : list.getContent()) {
                AdminDiscountVoucherDtoOut.DiscountVoucherDtoOut dtoOut = mapper.map(item, AdminDiscountVoucherDtoOut.DiscountVoucherDtoOut.class);
                adminDiscountVoucherDtoOuts.add(dtoOut);
            }
            AdminDiscountVoucherDtoOut result = AdminDiscountVoucherDtoOut.builder()
                    .discountVouchers(adminDiscountVoucherDtoOuts)
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
    public Optional<AdminDiscountVoucherDetailDtoOut> getById(Long id) {
        try {
            if (id != null) {
                Optional<DiscountVoucher> discountVoucher = discountVoucherRepos.findById(id);
                if (discountVoucher.isPresent()){
                    AdminDiscountVoucherDetailDtoOut result = mapper.map(discountVoucher.get(), AdminDiscountVoucherDetailDtoOut.class);
                    return Optional.of(result);
                }
            }
            return Optional.empty();
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Boolean saveVoucher(AdminDiscountVoucherDtoInput discountVoucherDtoInput) {
        try {
            DiscountVoucher save = mapper.map(discountVoucherDtoInput, DiscountVoucher.class);
            String code = new RandomString(8, ThreadLocalRandom.current()).nextString();
            save.setCode(code.toUpperCase());
            discountVoucherRepos.save(save);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateVoucher(AdminDiscountVoucherDtoInput discountVoucherDtoInput, Long id) {
        try {
            if (id != null && discountVoucherDtoInput != null) {
                DiscountVoucher update = discountVoucherRepos.findById(id).get();
                if (update != null) {
                    DiscountVoucher discountVoucher = mapper.map(discountVoucherDtoInput, DiscountVoucher.class);
                    discountVoucher.setDiscountVoucherId(id);
                    discountVoucher.setDiscountVoucherCustomers(update.getDiscountVoucherCustomers());
//                    discountVoucher.setOrderCollection(update.getOrderCollection());
                    discountVoucherRepos.save(discountVoucher);
                }

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
    public Boolean removeVoucher(Long id) {
        try {
            discountVoucherRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
