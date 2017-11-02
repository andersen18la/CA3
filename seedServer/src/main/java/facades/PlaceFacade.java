package facades;

import entity.Place;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

public class PlaceFacade {

    private EntityManagerFactory emf;

    public PlaceFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return this.emf.createEntityManager();
    }

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
    

}
