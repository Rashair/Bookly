package bookly.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Conditional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController {
    private static User authenticatedUser;
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        if(authenticatedUser == null || !authenticatedUser.getRole().equals("Admin")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/login")
    public ResponseEntity<User> logIn(@RequestParam String login, @RequestParam String password) {
        authenticatedUser = userService.logIn(login, password);
        if(authenticatedUser == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

       return ResponseEntity.ok().body(authenticatedUser);
    }

    public static User getAuthenticatedUser() {
        return authenticatedUser;
    }
}
