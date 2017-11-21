/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Rating;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

/**
 *
 * @author bloch
 */
public class RatingFacade {

    private EntityManagerFactory emf;

    public RatingFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return this.emf.createEntityManager();
    }

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

}
