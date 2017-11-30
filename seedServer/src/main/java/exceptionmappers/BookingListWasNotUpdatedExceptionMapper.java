/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptionmappers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import exceptions.BookingListWasNotUpdatedException;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class BookingListWasNotUpdatedExceptionMapper implements ExceptionMapper<BookingListWasNotUpdatedException> {

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    ServletContext context;

    @Override
    public Response toResponse(BookingListWasNotUpdatedException ex) {
        JsonObject error = new JsonObject();
        JsonObject errorDetail = new JsonObject();
        int statusCode = 409;
        ex.printStackTrace();
        errorDetail.addProperty("code", statusCode);
        errorDetail.addProperty("message", "Bookinglist was not updated for some reason" + ex.getMessage());
        error.add("error", errorDetail);
        return Response.status(statusCode).entity(gson.toJson(error)).type(MediaType.APPLICATION_JSON).build();
    }
}
