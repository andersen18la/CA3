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
import entity.User;
import facades.UserFacade;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import static javax.ws.rs.HttpMethod.PUT;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.minidev.json.JSONObject;
import security.PasswordStorage;

/**
 * REST Web Service
 *
 * @author plaul1
 */
@Path("demoall")
public class All {

    private UserFacade uf;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of A
     */
    public All() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        uf = new UserFacade(emf);
    }

    /**
     * Retrieves representation of an instance of rest.All
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getText() {
        return " {\"message\" : \"result for all\"}";
    }

    @PUT
    @Path("edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String Edit(String names) throws PasswordStorage.CannotPerformOperationException {
        JsonObject json = new JsonParser().parse(names).getAsJsonObject();
//        String olduser= json.get("oldUser").getAsString();
//        String newuser= json.get("newUser").getAsString();
        
        User newusertest = new User("hallur","123");
        
//        uf.Edit(n, "mo");
        
        return new Gson().toJson("wqpoeqowejopq");

    }
    
        @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("delete")
    public String delete(String name){
        JsonObject json = new JsonParser().parse(name).getAsJsonObject();
        String anotherName = json.get("userName").getAsString();
        
        System.out.println(anotherName);
        
        uf.deleteUser(anotherName);
        
        return new Gson().toJson("qwoijejqwjoie");
    }    


}
