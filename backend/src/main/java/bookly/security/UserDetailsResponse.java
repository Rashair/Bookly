package bookly.security;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDetailsResponse {
    @JsonProperty
    private String firstName;
    @JsonProperty
    private String lastName;
    @JsonProperty
    private String identificationToken;
    @JsonProperty
    private String securityToken;

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