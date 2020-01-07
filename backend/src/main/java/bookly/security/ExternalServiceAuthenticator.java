package bookly.security;

public interface ExternalServiceAuthenticator {
    AuthenticationWithToken authenticate(String username, String password);
}
