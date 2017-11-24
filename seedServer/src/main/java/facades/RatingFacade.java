/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Rating;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

/**
 *
 * @author bloch
 */
public class RatingFacade implements IRatingFacade {

    private EntityManagerFactory emf;

    public RatingFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return this.emf.createEntityManager();
    }

    @Override
    public Rating addRating(Rating rating)

    {
        EntityManager em = getEntityManager();

        try
        {
            em.getTransaction().begin();
            em.persist(rating);
            em.getTransaction().commit();
            return rating;

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
    public Rating getRating(int id)
    {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try
        {
            return em.find(Rating.class, lid);
        } finally
        {
            em.close();
        }
    }

    @Override
    public Rating editRating(Rating rating)
    {
        EntityManager em = getEntityManager();

        try
        {
            Rating oldRating = em.find(Rating.class, rating.getId());
            if (oldRating == null)
            {
                return null;
            }
            em.getTransaction().begin();
            em.merge(rating);
            em.getTransaction().commit();
            return rating;

        } finally
        {
            em.close();
        }

    }

    @Override
    public Rating deleteRating(int id)
    {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try
        {
            Rating rating = em.find(Rating.class, lid);
            if (rating == null)
            {
                return null;
            }
            em.getTransaction().begin();
            em.remove(rating);
            em.getTransaction().commit();
            return rating;

        } finally
        {
            em.close();
        }
    }

    @Override
    public List<Rating> getRatings()
    {
        EntityManager em = getEntityManager();
        try
        {
            List<Rating> ratings = em.createQuery("SELECT r from RATING r").getResultList();
            return ratings;
        } finally
        {
            em.close();
        }
    }

}
