package facades;

import entity.Rating;
import java.util.List;

public interface IRatingFacade {

    Rating addRating(Rating rating);

    Rating getRating(int id);

    Rating editRating(Rating rating);

    Rating deleteRating(int id);

    List<Rating> getRatings();

}
