package bookly.booking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByActive(Boolean status);

    List<Booking> findByOwnerSecurityToken(String token);

    List<Booking> findByOwnerSecurityTokenAndActive(String token, Boolean status);
}
