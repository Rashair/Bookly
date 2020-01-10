package bookly.security;

import bookly.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import java.util.Collection;

public class AuthenticationWithToken extends PreAuthenticatedAuthenticationToken {
    private UserDetailsResponse detailsResponse = new UserDetailsResponse();

    public AuthenticationWithToken(Object aPrincipal, Object aCredentials) {
        super(aPrincipal, aCredentials);
    }

    public AuthenticationWithToken(Object aPrincipal, Object aCredentials, Collection<? extends GrantedAuthority> anAuthorities) {
        super(aPrincipal, aCredentials, anAuthorities);
    }

    public AuthenticationWithToken(Object aPrincipal, Object aCredentials, Collection<? extends GrantedAuthority> anAuthorities, User user) {
        super(aPrincipal, aCredentials, anAuthorities);
        detailsResponse.setId(user.getId()).setFirstName(user.getFirstName()).
                setLastName(user.getLastName()).
                setIdentificationToken(user.getIdToken());
    }

    public String getToken() {
        return detailsResponse.getSecurityToken();
    }

    public void setToken(String token) {
        detailsResponse.setSecurityToken(token);
        setDetails(detailsResponse);
    }
}