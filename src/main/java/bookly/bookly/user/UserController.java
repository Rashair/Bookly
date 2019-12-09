package bookly.bookly.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bookly.bookly.exceptions.ResourceNotFoundException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserController
{
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserEntity>> retrieveAllUsers()
    {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping(path = "")
    public ResponseEntity<UserEntity> createUser(@RequestBody @Valid UserEntity user)
    {
        return ResponseEntity.ok().body(userService.saveUser(user));
    }
}
