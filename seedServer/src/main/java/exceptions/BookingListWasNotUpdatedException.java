/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptions;

/**
 *
 * @author Lasse Andersen
 */
public class BookingListWasNotUpdatedException extends RuntimeException {

    /**
     * Creates a new instance of <code>BookingListWasNotUpdated</code> without
     * detail message.
     */
    public BookingListWasNotUpdatedException() {
    }

    /**
     * Constructs an instance of <code>BookingListWasNotUpdated</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public BookingListWasNotUpdatedException(String msg) {
        super(msg);
    }
}
