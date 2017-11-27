/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptions;

/**
 *
 * @author Bloch
 */
public class LocationDoesNotExistsException extends RuntimeException {

    /**
     * Creates a new instance of <code>LocationDoesNotExistsException</code>
     * without detail message.
     */
    public LocationDoesNotExistsException()
    {
    }

    /**
     * Constructs an instance of <code>LocationDoesNotExistsException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public LocationDoesNotExistsException(String msg)
    {
        super(msg);
    }
}
