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
    private InfoEntity infoEntity;

    public Rating()
    {
    }

    public Rating(int ratingValue, User user, InfoEntity infoEntity)
    {
        this.user = user;
        this.ratingValue = ratingValue;
        this.infoEntity = infoEntity;
    }

    public InfoEntity getInfoEntity()
    {
        return infoEntity;
    }

    public void setInfoEntity(InfoEntity infoEntity)
    {
        this.infoEntity = infoEntity;
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
