package ipeps.pwd.wallet.module.company.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ipeps.pwd.wallet.module.contract.entity.Contract;
import ipeps.pwd.wallet.module.document.entity.Document;
import ipeps.pwd.wallet.module.employee.entity.Employee;
import ipeps.pwd.wallet.module.organization.entity.Organization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "company_id", updatable = true, nullable = false)
    UUID companyId;

    String name;
    String description;
    String address;
    boolean isManaged;
    boolean isActive;
    boolean isDeleted;
    String deletedBy;

    @JsonIgnoreProperties({"skills","company","timesheets","documents","contracts","fleets","salaries"})
    @OneToMany(mappedBy = "company")
    List<Employee> employees;
    @JsonIgnoreProperties({"company"})
    @OneToMany(mappedBy = "company")
    List<Organization> organizations;
    @JsonIgnoreProperties({"company", "contract", "employee"})
    @OneToMany(mappedBy = "company")
    List<Document> documents;

//    @ManyToMany(mappedBy = "companies")
//    List<Contract> contracts;
    @JsonIgnoreProperties({"company", "documents", "timesheets", "companyBusiness", "companyClient", "employee"})
    @OneToMany(mappedBy = "companyBusiness")
    List<Contract> contractsBusiness;
    @JsonIgnoreProperties({"company",  "documents", "timesheets", "companyBusiness", "companyClient", "employee"})
    @OneToMany(mappedBy = "companyClient")
    List<Contract> contractsClient;

    public Company(String name, String description, String address, boolean isManaged,
                   boolean isActive, boolean isDeleted, String deletedBy,
                   List<Employee> employees, List<Organization> organizations,
                   List<Document> documents,List<Contract> contractsClient,
                   List<Contract> contractsBusiness) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.isManaged = isManaged;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.deletedBy = deletedBy;
        this.employees = employees;
        this.organizations =organizations;
        this.documents = documents;
        this.contractsClient = contractsClient;
        this.contractsBusiness = contractsBusiness;
    }

}
