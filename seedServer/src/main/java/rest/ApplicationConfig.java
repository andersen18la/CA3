package rest;

import java.util.Set;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses()
    {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        resources.add(MultiPartFeature.class);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method. It is automatically
     * populated with all resources defined in the project. If required, comment
     * out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources)
    {
        resources.add(cors.CorsRequestFilter.class);
        resources.add(cors.CorsResponseFilter.class);
        resources.add(exceptionmappers.FileTypeNotValidExceptionMapper.class);
        resources.add(exceptionmappers.PlaceDoesNotExistExceptionMapper.class);
        resources.add(exceptionmappers.UserDoesNotExistExceptionMapper.class);
        resources.add(exceptionmappers.UserHaveAlreadyRatedExceptionMapper.class);
        resources.add(exceptionmappers.GenericExceptionMapper.class);
        resources.add(exceptionmappers.NotFoundExceptionMapper.class);
        resources.add(rest.Admin.class);
        resources.add(rest.PlaceResource.class);
        resources.add(rest.RatingResource.class);
        resources.add(rest.Register.class);
        resources.add(rest.UploadResource.class);
        resources.add(rest.UserResource.class);
        resources.add(security.JWTAuthenticationFilter.class);
        resources.add(security.Login.class);
        resources.add(exceptionmappers.NotAuthorizedExceptionMapper.class);
        resources.add(security.RolesAllowedFilter.class);
    }

}
