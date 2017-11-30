/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.House;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

public class HouseFacade implements IHouseFacade {

    private EntityManagerFactory emf;

    public HouseFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return this.emf.createEntityManager();
    }

    @Override
    public House getHouse(int id) {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try {
            em.getTransaction().begin();
            House house = em.find(House.class, lid);
            em.getTransaction().commit();
            return house;

        } catch (Exception e) {
            return null;
        } finally {
            em.close();
        }

    }

    @Override
    public List<House> getHouses() {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            List<House> houses = em.createQuery("SELECT h FROM HOUSE h").getResultList();
            return houses;
        } finally {
            em.close();
        }
    }

    @Override
    public House editHouse(House house) {
        EntityManager em = getEntityManager();
        try {
            House oldHouse = em.find(House.class, house.getId());
            if (oldHouse == null) {
                return null;
            }
            em.getTransaction().begin();
            em.merge(house);
            em.getTransaction().commit();
            return house;

        } finally {

            em.close();
        }

    }

    @Override
    public House deleteHouse(House house) {
        EntityManager em = getEntityManager();
        try {
            House oldHouse = em.find(House.class, house);
            if (oldHouse == null) {
                return null;
            }
            em.getTransaction().begin();
            em.remove(house);
            em.getTransaction().commit();
            return house;
        } finally {
            em.close();
        }
    }

    @Override
    public House deleteHouse(int id) {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try {
            House oldHouse = em.find(House.class, lid);
            if (oldHouse == null) {
                return null;
            }
            em.getTransaction().begin();
            em.remove(oldHouse);
            em.getTransaction().commit();
            return oldHouse;
        } finally {
            em.close();
        }
    }

    @Override
    public House addHouse(House house) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(house);
            em.getTransaction().commit();
            return house;

        } finally {
            em.close();
        }
    }

    @Override
    public List<House> getHousesFromCity(String cityName) {
        EntityManager em = getEntityManager();
        String city = cityName;
        try {
            Query q = em.createNamedQuery("House.getHouseFromCity");
            q.setParameter("city", city);
            List<House> houses = q.getResultList();
            return houses;

        } finally {
            em.close();
        }
    }

    @Override
    public List<House> getHousesFromZip(String zip) {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createNamedQuery("House.getHouseFromZip");
            q.setParameter("zip", zip);
            return q.getResultList();

        } finally {
            em.close();
        }
    }
}
