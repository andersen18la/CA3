/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity(name = "HOUSE")
public class House extends InfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @OneToMany(mappedBy = "house")
    private List<Booking> bookingList;

    public House() {
        this.bookingList = new ArrayList<>();
    }

    public House(String title, String city, String street, String zip, String geo, String description, String imageUri) {
        super(title, city, street, zip, geo, description, imageUri);
        this.bookingList = new ArrayList<>();
    }

    public List<Booking> getBookingList() {
        return bookingList;
    }

    public void setBookingList(List<Booking> bookingList) {
        this.bookingList = bookingList;
    }

    public boolean addBooking(Booking booking) {
        if (isDateTaken(booking) == true) {
            return false;
        }
        return this.bookingList.add(booking);
    }

    public boolean isDateTaken(Booking booking) {
        for (Booking bookingInList : this.bookingList) {
            if (bookingInList.getStartDate().equals(booking.getStartDate())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        return "entity.House[ id=" + super.getId() + " ]";
    }

}
