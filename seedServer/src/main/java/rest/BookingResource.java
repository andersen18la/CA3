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
import entity.Booking;
import entity.House;
import entity.IUser;
import entity.User;
import exceptions.DateIsNotAvailableException;
import exceptions.HouseDoesNotExistException;
import exceptions.UserDoesNotExistException;
import facades.BookingFacade;
import facades.HouseFacade;
import facades.LocationFacade;
import facades.UserFacade;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import jsonmappers.BookingMapper;

/**
 * REST Web Service
 *
 * @author Lasse Andersen
 */
@Path("booking")
public class BookingResource {

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private BookingFacade bf;
    private HouseFacade hf;
    private UserFacade uf;
    private LocationFacade lf;

    public BookingResource() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        this.bf = new BookingFacade(emf);
        this.hf = new HouseFacade(emf);
        this.uf = new UserFacade(emf);
        this.lf = new LocationFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        List<Booking> bookings = bf.getAllBookings();
        List<BookingMapper> bMappers = new ArrayList<>();
        for (Booking booking : bookings) {
            bMappers.add(new BookingMapper(booking));
        }
        return Response.status(Response.Status.OK).entity(bMappers).build();
    }

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response putJson(String content) {
        JsonObject json = new JsonParser().parse(content).getAsJsonObject();
        String userId = json.get("userId").getAsString();
        int houseId = json.get("houseId").getAsInt();
        String startDate = json.get("startDate").getAsString();
        String endDate = json.get("endDate").getAsString();
        
        IUser user = uf.getUserByUserId(userId);
        House house = hf.getHouse(houseId);
        Booking booking = new Booking((User) user, house, startDate, endDate);
        
        //rækkefølgen er vigtig.
        house.addBooking(booking);
        booking = bf.addBooking(booking);
        uf.addBookingToUser(booking);
        hf.editHouse(house);

        BookingMapper bookingMapper = new BookingMapper(booking);
        return Response.status(Response.Status.CREATED).entity(gson.toJson(bookingMapper)).build();

    }
}
