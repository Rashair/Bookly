package bookly.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "")
public class ApiController {
    public static final String AUTHENTICATE_URL ="/login";

    @PostMapping(AUTHENTICATE_URL)
    public ResponseEntity<UserDetails> logIn(final Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        System.out.println("Retrieved user with authorities: " + userDetails.getAuthorities());

        return ResponseEntity.ok().body(userDetails);
    }
}
