package cn.natic.mustang.repository;

import cn.natic.mustang.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    
}
