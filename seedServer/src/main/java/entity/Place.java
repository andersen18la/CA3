package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

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
    private int rating;

    public Place()
    {
    }

    public Place(String city, String street, String zip, String geo, String description, String imageUri, int rating)
    {
        this.city = city;
        this.street = street;
        this.zip = zip;
        this.description = description;
        this.imageUri = imageUri;
        this.rating = rating;
        this.geo = geo;
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

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
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

    public int getRating()
    {
        return rating;
    }

    public void setRating(int rating)
    {
        this.rating = rating;
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
    public int hashCode()
    {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object)
    {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Place))
        {
            return false;
        }
        Place other = (Place) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString()
    {
        return "entity.Place[ id=" + id + " ]";
    }

}
