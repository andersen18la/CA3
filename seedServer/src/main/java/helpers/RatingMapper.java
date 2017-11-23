package helpers;

import entity.Rating;

public class RatingMapper {

    private double ratingValue;
    private String userId;

    public RatingMapper(Rating rating)
    {
        this.ratingValue = rating.getRatingValue();
        this.userId = rating.getUser().getUserName();
    }

    public double getRatingValue()
    {
        return ratingValue;
    }

    public void setRatingValue(double ratingValue)
    {
        this.ratingValue = ratingValue;
    }

    public String getUserId()
    {
        return userId;
    }

    public void setUserId(String userId)
    {
        this.userId = userId;
    }

}
