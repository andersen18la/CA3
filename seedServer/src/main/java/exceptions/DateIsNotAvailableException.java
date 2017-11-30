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
public class DateIsNotAvailableException extends RuntimeException {

    /**
     * Creates a new instance of <code>DateIsNotAvailableException</code>
     * without detail message.
     */
    public DateIsNotAvailableException() {
    }

    /**
     * Constructs an instance of <code>DateIsNotAvailableException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public DateIsNotAvailableException(String msg) {
        super(msg);
    }
}
