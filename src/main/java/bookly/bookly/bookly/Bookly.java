package bookly.bookly.bookly;

import bookly.bookly.user.UserEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="bookly")
public class Bookly {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private UserEntity owner;

    @Column (name="start_date_time", nullable = false)
    private Date startDateTime;

    @Column(name="active", nullable = false)
    private boolean active;

    @Enumerated(EnumType.STRING)
    @Column(name="type", nullable = false)
    private BooklyType type;

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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public BooklyType getType() {
        return type;
    }

    public void setType(BooklyType type) {
        this.type = type;
    }
}
