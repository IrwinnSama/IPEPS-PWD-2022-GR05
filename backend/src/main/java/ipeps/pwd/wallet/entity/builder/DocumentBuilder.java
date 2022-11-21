package ipeps.pwd.wallet.entity.builder;

import ipeps.pwd.wallet.entity.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentBuilder implements  CreateBuilder{
    String title;
    String path;
    String content;
    String type;
    Date createDate;

    public DocumentBuilder setTitle(String title) {
        this.title = title;
        return this;
    }

    public DocumentBuilder setPath(String path) {
        this.path = path;
        return this;
    }

    public DocumentBuilder setContent(String content) {
        this.content = content;
        return this;
    }

    public DocumentBuilder setType(String type) {
        this.type = type;
        return this;
    }

    public DocumentBuilder setCreateDate(Date createdDate) {
        this.createDate = createDate;
        return this;
    }
    @Override
    public Document build() {
        return new Document(this.title, this.path, this.content, this.type, this.createDate);
    }
}
