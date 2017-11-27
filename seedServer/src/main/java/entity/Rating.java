package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

/**
 *
 * @author bloch
 */
@Entity(name = "RATING")
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ratingValue;
    @OneToOne
    private User user;
    @ManyToOne
    private Location location;

    public Rating()
    {
    }

    public Rating(int ratingValue, User user, Location location)
    {
        this.user = user;
        this.ratingValue = ratingValue;
        this.location = location;
    }

    public Location getLocation()
    {
        return location;
    }

    public void setLocation(Location location)
    {
        this.location = location;
    }

    public int getRatingValue()
    {
        return ratingValue;
    }

    public void setRatingValue(int ratingValue)
    {
        this.ratingValue = ratingValue;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    @Override
    public String toString()
    {
        return "entity.Rating[ id=" + id + " ]";
    }

}
