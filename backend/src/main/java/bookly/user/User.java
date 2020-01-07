package bookly.user;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @Column(name = "login", nullable = false)
    private String login;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role")
    private String role = "User";

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "securityToken")
    private String securityToken;

    @Column(name = "active")
    private boolean active;

    public User() {
    }

    public User(String login, String password, String role, String firstName, String lastName, String securityToken, boolean active) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.securityToken = securityToken;
        this.active = active;
    }

    public User(Long Id, String login, String password, String role, String firstName, String lastName, String securityToken, boolean active) {
        this(login, password, role, firstName, lastName, securityToken, active);
        this.id = Id;
    }

    @JsonGetter("id")
    public Long getId() {
        return this.id;
    }

    @JsonSetter("id")
    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonGetter("role")
    public String getRole() {
        return role;
    }

    @JsonSetter("role")
    public void setRole(String role) {
        this.role = role;
    }

    @JsonGetter("first_name")
    public String getFirstName() {
        return this.firstName;
    }

    @JsonSetter("first_name")
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonGetter("last_name")
    public String getLastName() {
        return this.lastName;
    }

    @JsonSetter("last_name")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @JsonGetter("securityToken")
    public String getSecurityToken() {
        return securityToken;
    }

    @JsonSetter("securityToken")
    public void setSecurityToken(String securityToken) {
        this.securityToken = securityToken;
    }

    @JsonGetter("active")
    public boolean isActive() {
        return this.active;
    }

    @JsonSetter("active")
    public void setActive(boolean active) {
        this.active = active;
    }
}
