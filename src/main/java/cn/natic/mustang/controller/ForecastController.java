package cn.natic.mustang.controller;

import cn.natic.mustang.entity.CreditCard;
import cn.natic.mustang.entity.Investment;
import cn.natic.mustang.repository.CreditCardRepository;
import cn.natic.mustang.repository.InvestmentRepository;
import cn.natic.mustang.view.AvailableFunds;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.text.bidi.BidiLine;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collector;

@RestController
public class ForecastController {

    @Autowired
    CreditCardRepository creditCardRepository;
    @Autowired
    InvestmentRepository investmentRepository;

    @RequestMapping("/getAvailableFunds")
    public List<AvailableFunds> getAvailableFunds(@RequestBody int period) {

        List<CreditCard> creditCards = creditCardRepository.findAll();
        List<Investment> investments = investmentRepository.findAll();

        List<AvailableFunds> availableFunds = new ArrayList<>();
        AvailableFunds availableFund;
        Date today = new Date();
        for (int i = 0; i < period; i++) {
            Date thisDay = DateUtils.addDays(today, i);
            availableFund = new AvailableFunds();
            availableFund.setDate(thisDay);

            BigDecimal invest = investments.stream()
                    .filter(investment -> investment.getEndDate().before(thisDay))
                    .map(Investment::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);


            BigDecimal credit = creditCards.stream()
                    .filter(creditCard -> creditCard.getRepaymentDate().before(thisDay))
                    .map(CreditCard::getBalance)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);


            availableFund.setFunds(invest.subtract(credit));
            availableFunds.add(availableFund);
        }

        return availableFunds;
    }
}
