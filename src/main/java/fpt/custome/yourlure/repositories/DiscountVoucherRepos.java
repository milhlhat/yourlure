package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.DiscountVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountVoucherRepos extends JpaRepository<DiscountVoucher, Long> {

    DiscountVoucher findByCode(String code);

    Page<DiscountVoucher> findByNameContainsIgnoreCase(String keyword, Pageable pageable);

}
