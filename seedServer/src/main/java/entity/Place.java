package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import security.IUser;

@Entity(name = "PLACE")
@NamedQueries(
        {
            @NamedQuery(name = "Place.findAllPlaces", query = "SELECT p FROM PLACE p")
        }
)
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String street;
    private String zip;
    private String description;
    private String imageUri;
    @Column(nullable = true)
    private String geo;
//    private int rating;

    @OneToMany(mappedBy = "place")
    private List<Rating> ratings;

    public Place()
    {
        this.ratings = new ArrayList<>();
    }

    public Place(String city, String street, String zip, String geo, String description, String imageUri)
    {
        this.city = city;
        this.street = street;
        this.zip = zip;
        this.description = description;
        this.imageUri = imageUri;
        this.ratings = new ArrayList<>();
        this.geo = geo;
    }

    public Place(String city, String street, String zip, String description, String imageUri, String geo, List<Rating> ratings)
    {
        this.city = city;
        this.street = street;
        this.zip = zip;
        this.description = description;
        this.imageUri = imageUri;
        this.geo = geo;
        this.ratings = ratings;
    }

    public String getGeo()
    {
        return geo;
    }

    public void setGeo(String geo)
    {
        this.geo = geo;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public List<Rating> getRatings()
    {
        return ratings;
    }

    public double getAverageRating()
    {
        double size = (double) this.ratings.size();
        double sum = 0;

        for (int i = 0; i < this.ratings.size(); i++)
        {
            sum += (double) this.ratings.get(i).getRatingValue();
        }
        double average = sum / size;
        return average;
    }

    public boolean addRating(Rating rating)
    {
        if (hasUserRated(rating) == true)
        {
            return false;
        }

        return this.ratings.add(rating);

    }

    public boolean hasUserRated(IUser user)
    {
        for (Rating rating : ratings)
        {
            if (user.getUserName().equals(rating.getUser().getUserName()))
            {
                return true;
            }
        }
        return false;

    }

    private boolean hasUserRated(Rating rating)
    {
        for (Rating aRating : ratings)
        {
            if (rating.getUser().getUserName().equals(aRating.getUser().getUserName()))
            {
                return true;
            }
        }
        return false;
    }

    public void setRatings(List<Rating> ratings)
    {
        this.ratings = ratings;
    }

    public String getStreet()
    {
        return street;
    }

    public void setStreet(String street)
    {
        this.street = street;
    }

    public String getZip()
    {
        return zip;
    }

    public void setZip(String zip)
    {
        this.zip = zip;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getImageUri()
    {
        return imageUri;
    }

    public void setImageUri(String imageUri)
    {
        this.imageUri = imageUri;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }
//
//    @Override
//    public int hashCode()
//    {
//        int hash = 0;
//        hash += (id != null ? id.hashCode() : 0);
//        return hash;
//    }
//
//    @Override
//    public boolean equals(Object object)
//    {
//        // TODO: Warning - this method won't work in the case the id fields are not set
//        if (!(object instanceof Place))
//        {
//            return false;
//        }
//        Place other = (Place) object;
//        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
//        {
//            return false;
//        }
//        return true;
//    }

    @Override
    public String toString()
    {
        return "entity.Place[ id=" + id + " ]";
    }

}
