package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import facades.UserFacade;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import security.IUser;
import security.Secret;

@Path("register")
public class Register {

    private UserFacade uf;
    private EntityManagerFactory emf;
    private Gson gson;

    @Context
    private UriInfo context;

    public Register()
    {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
        this.uf = new UserFacade(emf);
        this.gson = new GsonBuilder().setPrettyPrinting().create();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIt()
    {
        String message = "connection works!";
        return Response.ok(gson.toJson(message)).build();
    }

    //copy stuff from Login...
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewUser(String entity) throws JOSEException
    {
        try
        {
            //this could be replaced with a mapper
            JsonObject json = new JsonParser().parse(entity).getAsJsonObject();
            String username = json.get("username").getAsString();
            String password = json.get("password").getAsString();

            //add user to database. 
            IUser user = uf.addUser(username, password);
            if (user == null)
            {
                //make a new error and throw it and remember to not catch it in here, but with a exceptionmapper?
                System.out.println("!!!!!!!!********!!!!!!!!");
                return Response.status(Response.Status.CONFLICT).entity(gson.toJson("roev")).build();
            }

            JsonObject responseJson = new JsonObject();
            List<String> roles;
            //try to login.
            if ((roles = authenticate(username, password)) != null)
            {
                String token = createToken(username, roles);
                responseJson.addProperty("username", username);
                responseJson.addProperty("token", token);
                return Response.ok(new Gson().toJson(responseJson)).build();
            }
        } catch (Exception e)
        {
            if (e instanceof JOSEException)
            {
                throw e;
            }
        }
        throw new NotAuthorizedException("Invalid username or password! Please try again", Response.Status.UNAUTHORIZED);
    }

    private List<String> authenticate(String userName, String password)
    {
        return this.uf.authenticateUser(userName, password);
    }

    private String createToken(String subject, List<String> roles) throws JOSEException
    {
        StringBuilder res = new StringBuilder();
        for (String string : roles)
        {
            res.append(string);
            res.append(",");
        }
        String rolesAsString = res.length() > 0 ? res.substring(0, res.length() - 1) : "";
        String issuer = "semester3demo-cphbusiness.dk-computerScience";

        JWSSigner signer = new MACSigner(Secret.SHARED_SECRET);
        Date date = new Date();

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(subject)
                .claim("username", subject)
                .claim("roles", roles)
                .claim("issuer", issuer)
                .issueTime(date)
                .expirationTime(new Date(date.getTime() + 1000 * 60 * 60))
                .build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }
}
