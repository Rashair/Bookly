package bookly.security;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsResponse {
    //@JsonIgnore
    private Long id;

    private String firstName;
    private String lastName;
    private String identificationToken;
    private String securityToken;

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