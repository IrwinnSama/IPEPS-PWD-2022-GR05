package ipeps.pwd.wallet.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Organization {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "organization_id", updatable = false, nullable = false)
    UUID organization_id;

    String name;
    String description;

    @ManyToOne()
    @JoinColumn(name = "company_fk", referencedColumnName = "company_id", nullable = false, foreignKey=@ForeignKey(name = "organisation_company_fk"))
    Company company;
}
