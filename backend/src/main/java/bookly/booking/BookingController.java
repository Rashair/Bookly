package bookly.booking;

import bookly.error.BookingNotFoundException;
import bookly.error.ErrorResponse;
import bookly.security.AuthenticationWithToken;
import bookly.security.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/booking")
public class BookingController {
    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("")
    public ResponseEntity<List<Booking>> getBookings(@RequestParam(required = false) Boolean status) {
        if (status == null) {
            return ResponseEntity.ok(bookingService.findAll());
        }

        return ResponseEntity.ok(bookingService.findByStatus(status));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getBookings(@RequestParam(required = false) Boolean status, Principal userDetails) {
        UserDetailsResponse response = (UserDetailsResponse) ((AuthenticationWithToken) userDetails).getDetails();
        Long id = response.getId();
        if (status != null) {
            return ResponseEntity.ok(bookingService.findByOwnerIdAndStatus(id, status));
        }

        return ResponseEntity.ok(bookingService.findByOwnerId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable(value = "id") Long id) {
        Booking result = bookingService.findById(id);
        if (result == null) {
            throw new BookingNotFoundException("Id: " + id);
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking) {
        Booking result = bookingService.save(booking);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable(value = "id") Long id, @Valid @RequestBody Booking booking) {
        Booking bookingToUpdate = bookingService.findById(id);
        if (bookingToUpdate == null) {
            throw new BookingNotFoundException("Id: " + id);
        }

        bookingToUpdate.updateBooking(booking);

        final Booking updatedBooking = bookingService.save(bookingToUpdate);

        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBooking(@PathVariable(value = "id") Long id) {
        Booking bookingToDelete = bookingService.findById(id);
        if (bookingToDelete == null) {
            throw new BookingNotFoundException("Id: " + id);
        }

        bookingService.delete(bookingToDelete);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    @ExceptionHandler({BookingNotFoundException.class})
    public ResponseEntity<ErrorResponse> notFound(BookingNotFoundException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value(), "The booking was not found"),
                HttpStatus.NOT_FOUND);
    }
}
