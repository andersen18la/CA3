package exceptionmappers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import exceptions.UserDoesNotExistException;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserDoesNotExistExceptionMapper implements ExceptionMapper<UserDoesNotExistException> {

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    ServletContext context;

    @Override
    public Response toResponse(UserDoesNotExistException ex)
    {
        JsonObject error = new JsonObject();
        JsonObject errorDetail = new JsonObject();
        int statusCode = 404;
        ex.printStackTrace();
        errorDetail.addProperty("code", statusCode);
        errorDetail.addProperty("message", "User does not exist" + ex.getMessage());
        error.add("error", errorDetail);
        return Response.status(statusCode).entity(gson.toJson(error)).type(MediaType.APPLICATION_JSON).build();
    }

}
