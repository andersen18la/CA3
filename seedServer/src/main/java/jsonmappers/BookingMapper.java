package jsonmappers;

import entity.Booking;

public class BookingMapper {

    private String userId;
    private long bookingId;
    private long houseId;
    private String startDate;
    private String endDate;

    public BookingMapper(Booking booking) {
        this.userId = booking.getUser().getUserName();
        this.bookingId = booking.getId();
        this.houseId = booking.getHouse().getId();
        this.startDate = booking.getStartDate();
        this.endDate = booking.getEndDate();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getBookingId() {
        return bookingId;
    }

    public void setBookingId(long bookingId) {
        this.bookingId = bookingId;
    }

    public long getHouseId() {
        return houseId;
    }

    public void setHouseId(long houseId) {
        this.houseId = houseId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

}
