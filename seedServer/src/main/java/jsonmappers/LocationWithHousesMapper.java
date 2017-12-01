package jsonmappers;

import entity.Location;
import entity.Rating;
import java.util.ArrayList;
import java.util.List;

public class LocationWithHousesMapper {

    private Long id;
    private String title;
    private String city;
    private String street;
    private String zip;
    private String description;
    private String imageUri;
    private String geo;
    private List<RatingMapper> ratings;
    private double rating = 0;
    private List<HouseMapper> houses;

    public LocationWithHousesMapper()
    {
    }

    public LocationWithHousesMapper(Location loc, List<HouseMapper> houseMappers)
    {
        this.title = loc.getTitle();
        this.id = loc.getId();
        this.city = loc.getCity();
        this.street = loc.getStreet();
        this.zip = loc.getZip();
        this.description = loc.getDescription();
        this.imageUri = loc.getImageUri();
        this.geo = loc.getGeo();
        this.ratings = new ArrayList<>();
        if (!loc.getRatings().isEmpty())
        {
            for (Rating locationRating : loc.getRatings())
            {
                this.ratings.add(new RatingMapper(locationRating));
            }
            this.rating = loc.getAverageRating();
        }
        if (!houseMappers.isEmpty())
        {
            this.houses = houseMappers;
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

    public List<HouseMapper> getHouses()
    {
        return houses;
    }

    public void setHouses(List<HouseMapper> houses)
    {
        this.houses = houses;
    }

}
