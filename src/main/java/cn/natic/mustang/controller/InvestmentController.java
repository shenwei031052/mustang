package cn.natic.mustang.controller;

import cn.natic.mustang.entity.Investment;
import cn.natic.mustang.repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
public class InvestmentController {

    @Autowired
    InvestmentRepository repository;

    @RequestMapping("/getAllInvestments")
    public List<Investment> getAllInvestments() {
        return repository.findAll();
    }

    @Transactional
    @RequestMapping("/upsertInvestments")
    public List<Investment> upsertInvestments(@RequestBody List<Investment> investments) {
        return repository.save(investments);
    }

    @RequestMapping("/deleteInvestment")
    public void deleteInvestment(@RequestBody Investment investment) {
        repository.delete(investment);
    }
}
