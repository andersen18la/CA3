/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package helpers;

import entity.Place;
import entity.Rating;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Lasse Andersen
 */
public class PlaceMapper {
    
    private Long id;
    private String city;
    private String street;
    private String zip;
    private String description;
    private String imageUri;
    private String geo;
    private List<RatingMapper> ratings;
    private double rating = 0;
    
    public PlaceMapper()
    {
    }
    
    public PlaceMapper(Place place)
    {
        this.id = place.getId();
        this.city = place.getCity();
        this.street = place.getStreet();
        this.zip = place.getZip();
        this.description = place.getDescription();
        this.imageUri = place.getImageUri();
        this.geo = place.getGeo();
        this.ratings = new ArrayList<>();
        if (!place.getRatings().isEmpty())
        {
            for (Rating placeRating : place.getRatings())
            {
                this.ratings.add(new RatingMapper(placeRating));
            }
            this.rating = place.getAverageRating();
        }
    }
    
    public Long getId()
    {
        return id;
    }
    
    public void setId(Long id)
    {
        this.id = id;
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

    public List<RatingMapper> getRatings()
    {
        return ratings;
    }

    public void setRatings(List<RatingMapper> ratings)
    {
        this.ratings = ratings;
    }
    

    
    public double getRating()
    {
        return rating;
    }
    
    public void setRating(double rating)
    {
        this.rating = rating;
    }
    
}
