package bookly.booking;

import bookly.user.UserEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private UserEntity owner;

    @Column(name = "start_date_time", nullable = false)
    private Date startDateTime;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private BookingType type;

    public void updateBooking(Booking booking) {
        this.owner = booking.getOwner();
        this.startDateTime = booking.getStartDateTime();
        this.active = booking.getIsActive();
        this.type = booking.getType();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getOwner() {
        return owner;
    }

    public void setOwner(UserEntity owner) {
        this.owner = owner;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public boolean getIsActive() {
        return active;
    }

    public void setIsActive(boolean active) {
        this.active = active;
    }

    public BookingType getType() {
        return type;
    }

    public void setType(BookingType type) {
        this.type = type;
    }
}
