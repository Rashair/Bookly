package bookly.user;

import bookly.utils.JsonDateDeserializer;
import bookly.utils.JsonDateSerializer;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "active", nullable = false)
    private boolean active;

    public User() {
    }

    public User(String firstName, String lastName, String login, LocalDate dateOfBirth, boolean active) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
    }

    public User(Long Id, String FirstName, String LastName, String Login, LocalDate DateOfBirth, boolean Active) {
        this(FirstName, LastName, Login, DateOfBirth, Active);
        this.id = Id;
    }


    @JsonGetter("id")
    public Long getId() {
        return this.id;
    }

    @JsonGetter("first_name")
    public String getFirstName() {
        return this.firstName;
    }

    @JsonGetter("last_name")
    public String getLastName() {
        return this.lastName;
    }

    @JsonGetter("login")
    public String getLogin() {
        return this.login;
    }

    @JsonGetter("date_of_birth")
    public LocalDate getDateOfBirth() {
        return this.dateOfBirth;
    }

    @JsonGetter("active")
    public boolean getActive() {
        return this.active;
    }

    @JsonSetter("id")
    public void setId(Long id) {
        this.id = id;
    }

    @JsonSetter("first_name")
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonSetter("last_name")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @JsonSetter("login")
    public void setLogin(String login) {
        this.login = login;
    }

    @JsonSetter("date_of_birth")
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @JsonSetter("active")
    public void setActive(boolean active) {
        this.active = active;
    }

    @JsonGetter("password")
    public String getPassword() {
        return password;
    }

    @JsonSetter("password")
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", first_name='" + firstName + '\'' +
                ", last_name='" + lastName + '\'' +
                ", login='" + login + '\'' +
                ", date_of_birth=" + dateOfBirth +
                ", active=" + active +
                '}';
    }
}
