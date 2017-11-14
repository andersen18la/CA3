package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import facades.UserFacade;
import helpers.UserList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import security.IUser;
import security.PasswordStorage;

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
    public Response getAllUsers()
    {
        List<IUser> ul = uf.getAllUsers();
        UserList myUl = new UserList(ul);
        return Response.ok(gson.toJson(myUl)).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("delete")
    public Response deleteUser(String name)
    {
        JsonObject json = new JsonParser().parse(name).getAsJsonObject();
        String anotherName = json.get("userName").getAsString();

        System.out.println(anotherName);

        uf.deleteUser(anotherName);
        
        return Response.ok(gson.toJson(json)).build();
    }

    @PUT
    @Path("edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(String names) throws PasswordStorage.CannotPerformOperationException
    {
        JsonObject json = new JsonParser().parse(names).getAsJsonObject();
        String targetUser = json.get("user").getAsString();
        String role = json.get("role").getAsString();

        uf.editUser(role, targetUser);
        
        return Response.ok(gson.toJson(json)).build();
    }

}
