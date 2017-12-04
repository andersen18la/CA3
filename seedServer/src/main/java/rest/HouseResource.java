/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.House;
import exceptions.HouseNotFoundException;
import facades.HouseFacade;
import filehandlers.FileUpload;
import java.io.IOException;
import java.io.InputStream;
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

@Path("house")
public class HouseResource {

    private HouseFacade hf;
    private EntityManagerFactory emf;
    private FileUpload fileUpload;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    public HouseResource()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.hf = new HouseFacade(emf);
        this.fileUpload = new FileUpload();
    }

    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson()
    {
        /*
        55.7268594,12.4330393
         */
        //House huset = new House("Guldboligen", "Herlev", "Sandbyvej 45", "2730", "55.7283006,12.4336299", "Dette er et meget godt hus", "bob.jpg");
        //House huset = new House("Fynbohuset", "Herlev", "Højbjerg Vænge 24", "2730", "55.7268594,12.4330393", "God udsigt til et træ", "billede1.jpg");
        //House huset = new House("Fynbohuset", "Copenhagen", "Grønjordskollegiet", "2300", "55.6541078,12.5921368", "God udsigt til et træ", "billede1.jpg");
        //hf.addHouse(huset);
        List<House> houses = hf.getHouses();
        List<HouseMapper> houseMappers = new ArrayList<>();
        // Vi konverterer houses om til housemappers, som er POJOs. 
        for (House house : houses)
        {
            houseMappers.add(new HouseMapper(house));
        }
        return Response
                .status(Response.Status.OK)
                .entity(gson.toJson(houseMappers))
                .build();
    }

    @GET
    @Path("city/{city}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHouseInCity(@PathParam("city") String city)
    {
        List<House> houseList = hf.getHousesFromCity(city);
        System.out.println(houseList.size());
        List<HouseMapper> houseMappers = new ArrayList<>();
        for (House house : houseList)
        {
            houseMappers.add(new HouseMapper(house));
        }
        return Response
                .status(Response.Status.OK)
                .entity(gson.toJson(houseMappers))
                .build();
    }

    @GET
    @Path("zip/{zip}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHouseInZip(@PathParam("zip") String zip)
    {
        List<House> houseList = hf.getHousesFromZip(zip);
        List<HouseMapper> houseMappers = new ArrayList<>();
        for (House house : houseList)
        {
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
    public Response getHouseById(@PathParam("id") int id)
    {
        House house = hf.getHouse(id);
        if (house == null)
        {
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
            @FormDataParam("file") FormDataContentDisposition fileDisposition) throws IOException
    {
        String fileName = fileDisposition.getFileName();
        fileUpload.saveFile(file, fileName);
        //vi burde måske binde filename til en user? /john                
        House house = new House(title, city, street, zip, geo, description, fileName);
        house = hf.addHouse(house);

        return Response
                .status(Response.Status.CREATED)
                .entity(gson.toJson(new HouseMapper(house)))
                .build();
    }
}
