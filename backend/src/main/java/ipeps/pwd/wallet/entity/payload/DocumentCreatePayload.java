package ipeps.pwd.wallet.entity.payload;

import ipeps.pwd.wallet.entity.Company;
import ipeps.pwd.wallet.entity.Contract;
import ipeps.pwd.wallet.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentCreatePayload {
    String title;
    String path;
    String content;
    String type;
    Date createDate;
    Company company;
    Contract contract;
    Employee employee;
}
