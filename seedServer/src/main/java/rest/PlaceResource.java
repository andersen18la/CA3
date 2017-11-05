package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Place;
import facades.PlaceFacade;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("places")
public class PlaceResource {

    private PlaceFacade pf;
    private EntityManagerFactory emf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public PlaceResource()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.pf = new PlaceFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson()
    {
        return "{\"bob\" : \"TEST\"}";
    }

    @Path("all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlaces()
    {
        List<Place> places = pf.getAllPlaces();
        String result = gson.toJson(places);
        return result;

    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String bla(String placeObject)
    {
        JsonObject json = new JsonParser().parse(placeObject).getAsJsonObject();

        String city = json.get("city").getAsString();
        String street = json.get("street").getAsString();
        String zip = json.get("zip").getAsString();
        String description = json.get("description").getAsString();
        String imageUri = json.get("url").getAsString();
        String geo = json.get("geo").getAsString();
        int rating = json.get("rating").getAsInt();
        Place place = new Place(city, street, zip, geo, description, imageUri, rating);

        Place placeReturn = pf.addPlace(place);

        return gson.toJson(placeReturn);
    }

}
