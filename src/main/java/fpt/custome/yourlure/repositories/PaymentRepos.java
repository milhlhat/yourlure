package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepos extends JpaRepository<Payment, Long> {
}
