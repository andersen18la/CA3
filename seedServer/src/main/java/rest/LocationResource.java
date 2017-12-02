package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.House;
import entity.Location;
import facades.HouseFacade;
import facades.LocationFacade;
import filehandlers.FileUpload;
import jsonmappers.LocationMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import jsonmappers.HouseMapper;
import jsonmappers.LocationWithHousesMapper;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("location")
public class LocationResource {

    private LocationFacade lf;
    private EntityManagerFactory emf;
    private HouseFacade hf;
    private FileUpload fileUpload;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public LocationResource()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.lf = new LocationFacade(emf);
        this.hf = new HouseFacade(emf);
        this.fileUpload = new FileUpload();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson()
    {
        return "{\"test\" : \"TEST\"}";
    }

    @Path("all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getLocations()
    {
        //lf.addLocation(new Location("et navn eller titel på stedet","Fredensborg", "dødens gade", "6633", "123123123,23423423", "En meeeeeget flot by", "bob.jpg"));
        List<Location> locations = lf.getAllLocations();

        List<LocationMapper> jsonList = new ArrayList<>();
        for (Location location : locations)
        {
            jsonList.add(new LocationMapper(location));
        }
        String result = gson.toJson(jsonList);
        return result;
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSingleLocation(@PathParam("id") int id)
    {
        Location location = lf.getLocation(id);
        List<House> houses = hf.getHousesFromCity(location.getCity());
        List<HouseMapper> hms = new ArrayList<>();
        for (House house : houses)
        {
            hms.add(new HouseMapper(house));
        }
        LocationWithHousesMapper lh = new LocationWithHousesMapper(location, hms);
        return Response
                .status(Response.Status.OK)
                .entity(gson.toJson(lh))
                .build();
    }

    //RolesAllowed("User")
    @POST
    @Path("add")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response bla(@DefaultValue("")
            @FormDataParam("title") String title,
            @FormDataParam("city") String city,
            @FormDataParam("description") String description,
            @FormDataParam("street") String street,
            @FormDataParam("zip") String zip,
            @FormDataParam("geo") String geo,
            @FormDataParam("user") String user,
            @FormDataParam("file") InputStream file,
            @FormDataParam("file") FormDataContentDisposition fileDisposition) throws IOException
    {
        String fileName = fileDisposition.getFileName();
        fileUpload.saveFile(file, fileName);
        //vi burde måske binde filename til en user? /john
        Location location = new Location(title, city, street, zip, geo, description, fileName);
        location = lf.addLocation(location);
        return Response
                .status(Response.Status.CREATED)
                .entity(gson.toJson(new LocationMapper(location)))
                .build();
    }

}
