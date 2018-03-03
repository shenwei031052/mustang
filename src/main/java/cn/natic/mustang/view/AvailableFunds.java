package cn.natic.mustang.view;

import java.math.BigDecimal;
import java.util.Date;

public class AvailableFunds {

    private BigDecimal funds;
    private Date date;

    public BigDecimal getFunds() {
        return funds;
    }

    public void setFunds(BigDecimal funds) {
        this.funds = funds;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
