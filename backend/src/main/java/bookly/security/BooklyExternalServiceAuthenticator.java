package bookly.security;

import bookly.user.User;
import bookly.user.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.AuthorityUtils;

public class BooklyExternalServiceAuthenticator implements ExternalServiceAuthenticator {
    private UserRepository userRepository;

    public BooklyExternalServiceAuthenticator(UserRepository repository) {
        this.userRepository = repository;
    }

    @Override
    public AuthenticationWithToken authenticate(String username, String password) {
        User user = userRepository.findByLoginAndPassword(username, password);
        if (user == null) {
            throw new BadCredentialsException("User not found");
        }

        return new AuthenticationWithToken(username, password, AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_" + user.getRole()), user);
    }

}
