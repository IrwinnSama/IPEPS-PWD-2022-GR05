package ipeps.pwd.wallet.module.skill.entity;

import ipeps.pwd.wallet.module.contract.entity.Contract;
import ipeps.pwd.wallet.module.employee.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Skill {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "skill_id", updatable = false, nullable = false)
    UUID skill_id;

    String title;
    String description;

    @ManyToMany(mappedBy = "skills")
    List<Employee> employees;

    public Skill(String title, String description, List<Employee> employees) {
        this.title = title;
        this.description = description;
        this.employees = employees;
    }

}
