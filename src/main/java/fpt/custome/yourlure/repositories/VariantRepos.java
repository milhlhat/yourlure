package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantRepos extends JpaRepository<Variant, Long> {
}
