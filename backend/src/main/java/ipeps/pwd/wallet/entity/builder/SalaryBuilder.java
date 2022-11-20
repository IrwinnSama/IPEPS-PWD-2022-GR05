package ipeps.pwd.wallet.entity.builder;

import ipeps.pwd.wallet.entity.Salary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalaryBuilder implements CreateBuilder {
    Date create_date;
    String  title;
    String  comment;
    Float   amount;

    public SalaryBuilder setCreated_date(Date create_date){
        this.create_date = create_date;
        return this;
    }

    public SalaryBuilder setTitle(String title){
        this.title = title;
        return this;
    }

    public SalaryBuilder setComment(String comment){
        this.comment = comment;
        return this;
    }

    public SalaryBuilder setAmount(Float amount){
        this.amount = amount;
        return this;
    }

    @Override
    public Salary build() {
        return new Salary(this.create_date, this.title, this.comment, this.amount);
    }
}