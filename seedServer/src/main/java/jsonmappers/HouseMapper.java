/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsonmappers;

import entity.House;
import entity.Rating;
import java.util.ArrayList;
import java.util.List;

public class HouseMapper {

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

    public HouseMapper() {
    }

    public HouseMapper(House house) {
        this.title = house.getTitle();
        this.id = house.getId();
        this.city = house.getCity();
        this.street = house.getStreet();
        this.zip = house.getZip();
        this.description = house.getDescription();
        this.imageUri = house.getImageUri();
        this.geo = house.getGeo();
        this.ratings = new ArrayList<>();
        if (!house.getRatings().isEmpty()) {
            for (Rating locationRating : house.getRatings()) {
                this.ratings.add(new RatingMapper(locationRating));
            }
            this.rating = house.getAverageRating();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUri() {
        return imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public String getGeo() {
        return geo;
    }

    public void setGeo(String geo) {
        this.geo = geo;
    }

    public List<RatingMapper> getRatings() {
        return ratings;
    }

    public void setRatings(List<RatingMapper> ratings) {
        this.ratings = ratings;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

}
