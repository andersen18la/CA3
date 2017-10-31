/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.UserFacade;
import helpers.UserHelper;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import security.IUser;

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
    public All()
    {
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
    public String getText()
    {
        return " {\"message\" : \"result for all\"}";
    }

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createPerson(String content)
    {

        UserHelper uh = gson.fromJson(content, UserHelper.class);
        IUser newUser = uf.addUser(uh.getUsername(), uh.getPassword());
        System.out.println("virk forhelvede" + newUser.getUserName());
        return gson.toJson(newUser.getUserName());
    }

}
