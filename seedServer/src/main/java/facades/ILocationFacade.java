package facades;

import entity.Location;
import java.util.List;

public interface ILocationFacade {

    List<Location> getAllLocations();

    Location getLocation(int id);

    Location addLocation(Location location);

    Location editLocation(Location location);

    boolean deleteLocation(int id);

}
