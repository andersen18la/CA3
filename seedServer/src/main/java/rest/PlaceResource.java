package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Place;
import facades.PlaceFacade;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("places")
public class PlaceResource {

    private PlaceFacade pf;
    private EntityManagerFactory emf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public PlaceResource() {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.pf = new PlaceFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        return "{\"bob\" : \"TEST\"}";
    }

    @Path("all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlaces() {
        List<Place> places = pf.getAllPlaces();
        String result = gson.toJson(places);
        return result;

    }
}
