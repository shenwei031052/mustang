package cn.natic.mustang.controller;

import cn.natic.mustang.entity.CreditCard;
import cn.natic.mustang.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
public class CreditCardController {

    @Autowired
    CreditCardRepository repository;

    @RequestMapping("/getAllCreditCards")
    public List<CreditCard> getAllCreditCards() {
        return repository.findAll();
    }

    @Transactional
    @RequestMapping("/upsertCreditCards")
    public List<CreditCard> upsertCreditCards(@RequestBody List<CreditCard> creditCards) {
        return repository.save(creditCards);
    }

    @RequestMapping("/deleteCreditCard")
    public void deleteCreditCard(@RequestBody CreditCard creditCard) {
        repository.delete(creditCard);
    }
}
