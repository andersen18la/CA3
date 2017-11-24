package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Place;
import exceptions.FileTypeNotValidException;
import facades.PlaceFacade;
import jsonmappers.PlaceMapper;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("places")
public class PlaceResource {

    private PlaceFacade pf;
    private EntityManagerFactory emf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    public static final String FILE_LOCATION = "C:\\Users\\Hallur\\Desktop\\CA3\\seedServer\\src\\main\\webapp\\imgs\\";

    public PlaceResource()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.pf = new PlaceFacade(emf);
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
    public String getPlaces()
    {
        //pf.addPlace(new Place("Fredensborg", "dødens gade", "6633", "123123123,23423423", "En meeeeeget flot by", "bob.jpg"));
        List<Place> places = pf.getAllPlaces();

        List<PlaceMapper> jsonList = new ArrayList<>();
        for (Place place : places)
        {
            jsonList.add(new PlaceMapper(place));
        }
        String result = gson.toJson(jsonList);
        return result;
    }

    //RolesAllowed("User")
    @POST
    @Path("add")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response bla(@DefaultValue("")
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
        if (isFileTypeValid(fileName) == false)
        {
            throw new FileTypeNotValidException("Accepted file types are jpg and png");
        }

        saveFile(file, fileName);
        //vi burde måske binde filename til en user? /john
        String uri = fileName;
        //int rating = json.get("rating").getAsInt();
        Place place = new Place(city, street, zip, geo, description, uri);
        place = pf.addPlace(place);

        return Response
                .status(Response.Status.CREATED)
                .entity(gson.toJson(new PlaceMapper(place)))
                .build();
    }

    private boolean isFileTypeValid(String fileName)
    {
        String[] validFileTypes =
        {
            "jpeg", "jpg", "png"
        };

        if (fileName.contains(".") == false)
        {
            return false;
        }

        String[] splitOnDot = fileName.split("\\.");
        for (String validFileType : validFileTypes)
        {
            if (splitOnDot[splitOnDot.length - 1].equals(validFileType))
            {
                return true;
            }
        }
        return false;
    }

    private void saveFile(InputStream is, String fileLocation) throws IOException
    {
        String location = FILE_LOCATION + fileLocation;
        try (OutputStream os = new FileOutputStream(new File(location)))
        {
            byte[] buffer = new byte[256];
            int bytes = 0;
            while ((bytes = is.read(buffer)) != -1)
            {
                os.write(buffer, 0, bytes);
            }
        }
    }

}
