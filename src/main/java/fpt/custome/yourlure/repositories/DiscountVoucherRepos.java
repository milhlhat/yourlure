package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.DiscountVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiscountVoucherRepos extends JpaRepository<DiscountVoucher, Long> {

    DiscountVoucher findByCode(String code);

    Page<DiscountVoucher> findByNameContainsIgnoreCase(String keyword, Pageable pageable);

    @Query(value = "\tselect v.* \n" +
            "FROM\n" +
            "\ttbl_discount_voucher v \n" +
            "WHERE\n" +
            "\tconcat ( UPPER ( unaccent ( v.name ) ), UPPER ( v.code ) ) LIKE UPPER ( unaccent ( ?1 ) )"
            ,nativeQuery = true)
    Page<DiscountVoucher> searchAll(String keyword, Pageable pageable);

}
