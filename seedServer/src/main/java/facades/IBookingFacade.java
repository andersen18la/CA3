package facades;

import entity.Booking;
import java.util.List;

public interface IBookingFacade {

    
    Booking getBooking(int id);
    
    Booking addBooking(Booking booking);
    
    Booking editBooking(Booking booking);
    
    boolean deleteBooking(Booking booking);
    
    boolean deleteBooking(int id);
    
    List<Booking> getAllBookings();
}
