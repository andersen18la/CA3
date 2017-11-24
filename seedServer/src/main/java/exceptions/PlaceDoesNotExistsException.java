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
public class PlaceDoesNotExistsException extends RuntimeException {

    /**
     * Creates a new instance of <code>PlaceDoesNotExistsException</code>
     * without detail message.
     */
    public PlaceDoesNotExistsException()
    {
    }

    /**
     * Constructs an instance of <code>PlaceDoesNotExistsException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public PlaceDoesNotExistsException(String msg)
    {
        super(msg);
    }
}
