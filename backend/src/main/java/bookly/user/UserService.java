package bookly.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        List<User> usersList = userRepository.findAll();
        if (usersList.size() > 0) {
            return usersList;
        }
        return new ArrayList<User>();
    }

    public User logIn(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password);
    }
}
