package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name = "LOCATION")
@NamedQueries(
        {
            @NamedQuery(name = "Location.findAllLocations", query = "SELECT l FROM LOCATION l")
        }
)
public class Location extends InfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    public Location()
    {
    }

    public Location(String title, String city, String street, String zip, String geo, String description, String imageUri)
    {
        super(title, city, street, zip, geo, description, imageUri);
    }

    @Override
    public String toString()
    {
        return "Location{" + '}';
    }
}
