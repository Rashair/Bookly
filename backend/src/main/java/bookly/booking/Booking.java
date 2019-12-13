package bookly.booking;

import bookly.user.User;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

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
    private User owner;

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
        this.active = booking.isActive();
        this.type = booking.getType();
    }

    @JsonGetter("id")
    public Long getId() {
        return id;
    }

    @JsonSetter("id")
    public void setId(Long id) {
        this.id = id;
    }

    @JsonGetter("owner")
    public User getOwner() {
        return owner;
    }

    @JsonSetter("owner")
    public void setOwner(User owner) {
        this.owner = owner;
    }

    @JsonGetter("start_date_time")
    public Date getStartDateTime() {
        return startDateTime;
    }

    @JsonSetter("start_date_time")
    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    @JsonGetter("active")
    public boolean isActive() {
        return active;
    }

    @JsonSetter("active")
    public void setActive(boolean active) {
        this.active = active;
    }

    @JsonGetter("type")
    public BookingType getType() {
        return type;
    }

    @JsonGetter("type")
    public void setType(BookingType type) {
        this.type = type;
    }
}
