package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.DiscountVoucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountVoucherRepos extends JpaRepository<DiscountVoucher, Long> {

    DiscountVoucher findByCode(String code);

}
