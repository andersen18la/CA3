/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Place;
import entity.Rating;
import entity.User;
import facades.PlaceFacade;
import facades.RatingFacade;
import facades.UserFacade;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import security.IUser;

@Path("rating")
public class RatingResource {

    private RatingFacade rf;
    private UserFacade uf;
    private PlaceFacade pf;
    private EntityManagerFactory emf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public RatingResource()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.rf = new RatingFacade(emf);
        this.pf = new PlaceFacade(emf);
        this.uf = new UserFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson()
    {
        return "{\"bob\" : \"TEST\"}";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String putJson(String content)
    {
        //hvad skal vi have ind:
        /*
            int user id?;
            int place id?;
            int rating value?;
         */
        JsonObject json = new JsonParser().parse(content).getAsJsonObject();
        String userId = json.get("userId").getAsString();
        int ratingValue = json.get("ratingValue").getAsInt();
        int placeId = json.get("placeId").getAsInt();
        IUser user = uf.getUserByUserId(userId);
        System.out.println("ratingResource " + userId);
        if (user == null)
        {
            return "{\"bob\" : \"Brugeren findes ikke\"}";
        }
        Place place = pf.getPlace(placeId);
        if (place == null)
        {
            return "{\"bob\" : \"Place findes ikke\"}";
        }

        if (place.hasUserRated(user) == true)
        {
            return "{\"User\" : \"Brugeren har allerede rated\"}";
        }

        Rating rating = new Rating(ratingValue, (User) user, place);
        //rating = rf.addRating(rating);
        place.addRating(rating);
        pf.editPlace(place);
        return "{\"bob\" : \"rating added\"}";

    }

}
