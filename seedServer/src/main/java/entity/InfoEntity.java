/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

/**
 *
 * @author bloch
 */
@Entity(name = "INFOENTITY")
@Inheritance(strategy = InheritanceType.JOINED)
public class InfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String city;
    private String street;
    private String zip;
    private String description;
    private String imageUri;
    @Column(nullable = true)
    private String geo;
    @OneToMany(mappedBy = "infoEntity")
    private List<Rating> ratings;

    public InfoEntity()
    {
        this.ratings = new ArrayList<>();
    }

    public InfoEntity(String title, String city, String street, String zip, String geo, String description, String imageUri)
    {
        this.city = city;
        this.street = street;
        this.zip = zip;
        this.description = description;
        this.imageUri = imageUri;
        this.ratings = new ArrayList<>();
        this.geo = geo;
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

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
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

    public String getGeo()
    {
        return geo;
    }

    public void setGeo(String geo)
    {
        this.geo = geo;
    }

    public List<Rating> getRatings()
    {
        return ratings;
    }

    public void setRatings(List<Rating> ratings)
    {
        this.ratings = ratings;
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
        return "entity.InfoEntity[ id=" + id + " ]";
    }

}
