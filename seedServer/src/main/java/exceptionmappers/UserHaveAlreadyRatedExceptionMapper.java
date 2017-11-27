package exceptionmappers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import exceptions.UserHaveAlreadyRatedException;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserHaveAlreadyRatedExceptionMapper implements ExceptionMapper<UserHaveAlreadyRatedException> {

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    @Context
    private ServletContext context;

    @Override
    public Response toResponse(UserHaveAlreadyRatedException ex)
    {
        JsonObject error = new JsonObject();
        JsonObject errorDetail = new JsonObject();
        int statusCode = 400;
        ex.printStackTrace();
        errorDetail.addProperty("code", statusCode);
        errorDetail.addProperty("message", "User have already rated this location." + ex.getMessage());
        error.add("error", errorDetail);
        return Response.status(statusCode).entity(gson.toJson(error)).type(MediaType.APPLICATION_JSON).build();
    }
}
