package bookly.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingsRepository) {
        this.bookingRepository = bookingsRepository;
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public List<Booking> findByStatus(Boolean status) {
        return bookingRepository.findByStatus(status);
    }

    public Booking findById(Long id) {
        return bookingRepository.findById(id).get();
    }

    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void delete(Booking bookingToDelete) {
        bookingRepository.delete(bookingToDelete);
    }
}
