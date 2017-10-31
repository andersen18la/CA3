package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import facades.UserFacade;
import java.util.Random;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import security.IUser;

@Path("demouser")
@RolesAllowed("User")
public class UserResource {

    UserFacade uf;

    public UserResource() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        this.uf = new UserFacade(emf);
    }
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static Random rand = new Random();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething() {
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("random")
    public String getRandomNumber() {
        int number = rand.nextInt(40);
        return "{\"number\" : \"" + number + "\"}";
    }

//        @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public String postPerson(String content)
//    {
//        JsonObject body = new JsonParser().parse(content).getAsJsonObject();
//        String PersonFirstName = "";
//        String PersonLastName = "";
//        int PersonPhoneNumber = 0;
//    
//        if(body.has("firstName"))
//        {
//            PersonFirstName = body.get("firstName").getAsString();
//        }
//        if(body.has("lastName"))
//        {
//            PersonLastName = body.get("lastName").getAsString();
//        }
//        if(body.has("phoneNumber"))
//        {
//            PersonPhoneNumber = body.get("phoneNumber").getAsInt();
//        }       
//
//        Person p = new Person(PersonFirstName, PersonLastName, PersonPhoneNumber);
//        fp.addPerson(p);
//        
//        return new Gson().toJson(p);
//    }
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createPerson(String content) {
        IUser newUser = gson.fromJson(content, IUser.class);

        return gson.toJson(uf.createUser(newUser));
    }

}
