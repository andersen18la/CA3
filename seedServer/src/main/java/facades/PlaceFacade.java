package facades;

import entity.Place;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

public class PlaceFacade implements IPlaceFacade {

    private EntityManagerFactory emf;

    public PlaceFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return this.emf.createEntityManager();
    }

    @Override
    public List<Place> getAllPlaces()
    {
        List<Place> places;
        EntityManager em = getEntityManager();
        try
        {
            Query q = em.createNamedQuery("Place.findAllPlaces");
            places = q.getResultList();
            return places;

        } catch (Exception e)
        {
            return null;
        } finally
        {
            em.close();
        }
    }

    @Override
    public Place getPlace(int id)
    {
        Long lid = (long) id;
        EntityManager em = getEntityManager();
        Place place;
        try
        {
            place = em.find(Place.class, lid);
            return place;
        } finally
        {
            em.close();
        }
    }

    @Override
    public Place addPlace(Place place)
    {
        EntityManager em = getEntityManager();
        try
        {
            em.getTransaction().begin();
            em.persist(place);
            em.getTransaction().commit();
            return place;
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
    public Place editPlace(Place place)
    {
        EntityManager em = getEntityManager();
        try
        {
            em.getTransaction().begin();
            em.merge(place);
            em.getTransaction().commit();
            return place;

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
    public boolean deletePlace(int id)
    {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try
        {
            Place place = em.find(Place.class, lid);
            if (place != null)
            {
                em.getTransaction().begin();
                em.remove(place);
                em.getTransaction().commit();
                return true;
            }
            return false;
        } finally
        {
            em.close();
        }
    }

}
