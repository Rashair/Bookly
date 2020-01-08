package bookly.booking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByActive(Boolean status);

    List<Booking> findByOwnerId(Long id);

    List<Booking> findByOwnerIdAndActive(Long id, Boolean status);
}
