package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import deploy.DeploymentConfiguration;
import facades.UserFacade;
import helpers.UserList;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import security.IUser;

@Path("demoadmin")
@RolesAllowed("Admin")
public class Admin {

    private UserFacade uf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public Admin()
    {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        uf = new UserFacade(emf);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething()
    {
        String now = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").format(new Date());
        return "{\"message\" : \"Hello Admin from server (call accesible by only authenticated ADMINS)\",\n" + "\"serverTime\": \"" + now + "\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("users")
    public String getAllUsers()
    {
        List<IUser> ul = uf.getAllUsers();
        UserList myUl = new UserList(ul);
        return gson.toJson(myUl);
    }

}
