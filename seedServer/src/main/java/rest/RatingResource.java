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
import exceptions.PlaceDoesNotExistsException;
import exceptions.UserDoesNotExistException;
import exceptions.UserHaveAlreadyRatedException;
import facades.PlaceFacade;
import facades.RatingFacade;
import facades.UserFacade;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import jsonmappers.RatingMapper;
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

    @RolesAllowed("User")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response putJson(String content)
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
            throw new UserDoesNotExistException();
        }
        Place place = pf.getPlace(placeId);
        if (place == null)
        {
            throw new PlaceDoesNotExistsException();
        }

        if (place.hasUserRated(user) == true)
        {
            throw new UserHaveAlreadyRatedException();
        }

        Rating rating = new Rating(ratingValue, (User) user, place);        
        place.addRating(rating);
        pf.editPlace(place);
        return Response.status(Response.Status.CREATED).entity(gson.toJson(new RatingMapper(rating))).build();

    }

}
