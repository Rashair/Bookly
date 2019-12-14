package bookly.user;

import bookly.booking.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController
{
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<User>> retrieveAllUsers()
    {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping(path = "/")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user)
    {
        return ResponseEntity.ok().body(userService.saveUser(user));
    }
}
