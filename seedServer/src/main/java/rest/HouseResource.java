/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.House;
import entity.Location;
import exceptions.FileTypeNotValidException;
import exceptions.HouseNotFoundException;
import facades.HouseFacade;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
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
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import static rest.LocationResource.FILE_LOCATION;

@Path("house")
public class HouseResource {

    private HouseFacade hf;
    private EntityManagerFactory emf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    public HouseResource() {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.hf = new HouseFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        House huset = new House("Det lille hus på dammen", "hillerød", "3400", "hej-huset", "454545,343433", "hej-huset", "bob.jpg");
        hf.addHouse(huset);
        List<House> houses = hf.getHouses();
        List<HouseMapper> houseMappers = new ArrayList<>();
        // Vi konverterer houses om til housemappers, som er POJOs. 
        for (House house : houses) {
            houseMappers.add(new HouseMapper(house));
        }
        return Response
                .status(Response.Status.OK)
                .entity(gson.toJson(houseMappers))
                .build();
    }
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHouseById(@PathParam("id")int id){
        House house = hf.getHouse(id);
        if(house == null){
            //return Response.status(Response.Status.GONE).build();
            throw new HouseNotFoundException();
        }
        HouseMapper houseMapper = new HouseMapper(house);
       return Response.status(Response.Status.OK).entity(gson.toJson(houseMapper)).build();
    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response addHouse(@DefaultValue("") @FormDataParam("title") String title,
            @FormDataParam("city") String city,
            @FormDataParam("description") String description,
            @FormDataParam("street") String street,
            @FormDataParam("zip") String zip,
            @FormDataParam("geo") String geo,
            @FormDataParam("user") String user,
            @FormDataParam("file") InputStream file,
            @FormDataParam("file") FormDataContentDisposition fileDisposition) throws IOException {
        String fileName = fileDisposition.getFileName();
        if (isFileTypeValid(fileName) == false) {
            throw new FileTypeNotValidException("Accepted file types are jpg and png");
        }

        saveFile(file, fileName);
        //vi burde måske binde filename til en user? /john
        String uri = fileName;
        //int rating = json.get("rating").getAsInt();
        House house = new House(title, city, street, zip, geo, description, uri);
        house = hf.addHouse(house);

        return Response
                .status(Response.Status.CREATED)
                .entity(gson.toJson(new HouseMapper(house)))
                .build();
    }

    private boolean isFileTypeValid(String fileName) {
        String[] validFileTypes
                = {
                    "jpeg", "jpg", "png"
                };

        if (fileName.contains(".") == false) {
            return false;
        }

        String[] splitOnDot = fileName.split("\\.");
        for (String validFileType : validFileTypes) {
            if (splitOnDot[splitOnDot.length - 1].equals(validFileType)) {
                return true;
            }
        }
        return false;
    }

    private void saveFile(InputStream is, String fileLocation) throws IOException {
        String location = FILE_LOCATION + fileLocation;
        try (OutputStream os = new FileOutputStream(new File(location))) {
            byte[] buffer = new byte[256];
            int bytes = 0;
            while ((bytes = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytes);
            }
        }
    }

}
