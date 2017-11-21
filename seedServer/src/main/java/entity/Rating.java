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
    private Place place;

    public Rating()
    {
    }

    public Rating(int ratingValue, User user, Place place)
    {
        this.user = user;
        this.ratingValue = ratingValue;
        this.place = place;
    }

    public Place getPlace()
    {
        return place;
    }

    public void setPlace(Place place)
    {
        this.place = place;
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

//    @Override
//    public int hashCode()
//    {
//        int hash = 0;
//        hash += (id != null ? id.hashCode() : 0);
//        return hash;
//    }
//    @Override
//    public boolean equals(Object object)
//    {
//        // TODO: Warning - this method won't work in the case the id fields are not set
//        if (!(object instanceof Rating))
//        {
//            return false;
//        }
//        Rating other = (Rating) object;
//        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
//        {
//            return false;
//        }
//        return true;
//    }
    @Override
    public String toString()
    {
        return "entity.Rating[ id=" + id + " ]";
    }

}
