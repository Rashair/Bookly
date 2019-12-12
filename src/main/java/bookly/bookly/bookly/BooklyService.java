package bookly.bookly.bookly;

import bookly.bookly.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BooklyService {
    private BooklyRepository booklyRepository;

    @Autowired
    public BooklyService(BooklyRepository booklyRepository) {
        this.booklyRepository = booklyRepository;
    }
}
