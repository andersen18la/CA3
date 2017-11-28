package facades;

import entity.Booking;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public class BookingFacade implements IBookingFacade {

    private EntityManagerFactory emf;

    public BookingFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public Booking getBooking(int id) {
        Long lid = (long) id;
        EntityManager em = getEntityManager();
        try {
            Booking booking = em.find(Booking.class, lid);
            return booking;
        } finally {
            em.close();
        }
    }

    @Override
    public Booking addBooking(Booking booking) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(booking);
            em.getTransaction().commit();
            return booking;
        } finally {
            em.close();
        }
    }

    @Override
    public Booking editBooking(Booking booking) {
        EntityManager em = getEntityManager();

        try {
            Booking oldBooking = em.find(Booking.class, booking.getId());
            if (oldBooking == null) {
                return null;
            }
            em.getTransaction().begin();
            em.merge(booking);
            em.getTransaction().commit();
            return booking;

        } finally {
            em.close();
        }
    }

    @Override
    public boolean deleteBooking(Booking booking) {
        EntityManager em = getEntityManager();
        try {
            Booking oldBooking = em.find(Booking.class, booking.getId());
            if (oldBooking == null) {
                return false;
            }
            em.getTransaction().begin();
            em.remove(booking);
            em.getTransaction().commit();
            return true;
        } finally {
            em.close();
        }
    }

    @Override
    public boolean deleteBooking(int id) {
        EntityManager em = getEntityManager();
        long lid = (long) id;
        try {
            Booking booking = em.find(Booking.class, lid);
            if (booking == null) {
                return false;
            }
            em.getTransaction().begin();
            em.remove(booking);
            em.getTransaction().commit();
            return true;
        } finally {
            em.close();
        }
    }

    @Override
    public List<Booking> getAllBookings() {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            List<Booking> bookingList = em.createQuery("SELECT b FROM BOOKING b").getResultList();
            em.getTransaction().commit();
            return bookingList;
        } finally {
            em.close();
        }
    }

}
