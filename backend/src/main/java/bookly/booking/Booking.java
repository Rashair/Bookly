package bookly.booking;

import bookly.user.User;
import bookly.utils.JsonDateDeserializer;
import bookly.utils.JsonDateSerializer;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
@EntityListeners(AuditingEntityListener.class)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User owner;

    @Column(name = "start_date_time", nullable = false)
    private LocalDate startDateTime;

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
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    public LocalDate getStartDateTime() {
        return startDateTime;
    }

    @JsonSetter("start_date_time")
    public void setStartDateTime(LocalDate startDateTime) {
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

    @JsonSetter("type")
    public void setType(BookingType type) {
        this.type = type;
    }
}
