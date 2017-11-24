package facades;

import entity.Place;
import java.util.List;

public interface IPlaceFacade {

    List<Place> getAllPlaces();

    Place getPlace(int id);

    Place addPlace(Place place);

    Place editPlace(Place place);

    boolean deletePlace(int id);

}
