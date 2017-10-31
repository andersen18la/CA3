package rest;

import java.util.Random;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("demouser")
@RolesAllowed("User")
public class User {

    private static Random rand = new Random();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething()
    {
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("random")
    public String getRandomNumber()
    {
        int number = rand.nextInt(40);
        return "{\"number\" : \"" + number + "\"}";
    }

}
