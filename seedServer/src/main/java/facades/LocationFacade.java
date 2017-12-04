package facades;

import entity.Location;
import exceptions.LocationDoesNotExistsException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

public class LocationFacade implements ILocationFacade {

    private EntityManagerFactory emf;

    public LocationFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return this.emf.createEntityManager();
    }

    @Override
    public List<Location> getAllLocations()
    {
        List<Location> locations;
        EntityManager em = getEntityManager();
        try
        {
            Query q = em.createNamedQuery("Location.findAllLocations");
            locations = q.getResultList();
            return locations;

        } catch (Exception e)
        {
            return null;
        } finally
        {
            em.close();
        }
    }

    @Override
    public Location getLocation(int id)
    {
        Long lid = (long) id;
        EntityManager em = getEntityManager();
        Location location;
        try
        {
            location = em.find(Location.class, lid);
            if (location == null)
            {
                throw new LocationDoesNotExistsException();
            }
            return location;
        } finally
        {
            em.close();
        }
    }

    @Override
    public Location addLocation(Location location)
    {
        EntityManager em = getEntityManager();
        try
        {
            em.getTransaction().begin();
            em.persist(location);
            em.getTransaction().commit();
            return location;
        } catch (Exception e)
        {
            em.getTransaction().rollback();
            return null;
        } finally
        {
            em.close();
        }
    }

    @Override
    public Location editLocation(Location location)
    {
        EntityManager em = getEntityManager();
        try
        {
            if (em.find(Location.class, location.getId()) == null)
            {
                throw new LocationDoesNotExistsException();
            }
            em.getTransaction().begin();
            em.merge(location);
            em.getTransaction().commit();
            return location;
        } finally
        {
            em.close();
        }
    }

    @Override
    public boolean deleteLocation(int id)
    {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try
        {
            Location location = em.find(Location.class, lid);
            if (location == null)
            {
                throw new LocationDoesNotExistsException();
            }
            em.getTransaction().begin();
            em.remove(location);
            em.getTransaction().commit();
            return true;

        } finally
        {
            em.close();
        }
    }

}
