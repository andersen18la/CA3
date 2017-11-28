/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import entity.Booking;
import facades.BookingFacade;
import facades.LocationFacade;
import facades.UserFacade;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
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

    private BookingFacade bf;
    private UserFacade uf;
    private LocationFacade lf;

    /**
     * Creates a new instance of BookingResource
     */
    public BookingResource() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        this.bf = new BookingFacade(emf);
    }

    /**
     * Retrieves representation of an instance of rest.BookingResource
     *
     * @return an instance of java.lang.String
     */
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

    /**
     * PUT method for updating or creating an instance of BookingResource
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
