package bookly.security;

import bookly.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String identificationToken;
    private String securityToken;

    public UserDetailsResponse(){}

    public UserDetailsResponse(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email=  user.getEmail();
        this.identificationToken = user.getIdToken();
    }

    public Long getId() {
        return id;
    }

    public UserDetailsResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserDetailsResponse setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public UserDetailsResponse setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdentificationToken() {
        return identificationToken;
    }

    public UserDetailsResponse setIdentificationToken(String identificationToken) {
        this.identificationToken = identificationToken;
        return this;
    }

    public String getSecurityToken() {
        return securityToken;
    }

    public UserDetailsResponse setSecurityToken(String securityToken) {
        this.securityToken = securityToken;
        return this;
    }

    @Override
    public String toString() {
        return securityToken;
    }
}