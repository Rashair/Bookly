package bookly.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "")
public class ApiController {
    public static final String AUTHENTICATE_URL = "/login";
    public static final String ID_TOKEN_HEADER_KEY = "Id-Token";
    private final static Logger logger = LoggerFactory.getLogger(ApiController.class);

    @PostMapping(AUTHENTICATE_URL)
    public ResponseEntity<UserDetails> logIn(final Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        logger.info("Retrieved user with authorities: " + userDetails.getAuthorities());

        return ResponseEntity.ok().body(userDetails);
    }
}
