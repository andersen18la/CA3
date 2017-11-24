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
public class UserDoesNotExistException extends RuntimeException {

    /**
     * Creates a new instance of <code>UserDoesNotExistException</code> without
     * detail message.
     */
    public UserDoesNotExistException()
    {
    }

    /**
     * Constructs an instance of <code>UserDoesNotExistException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public UserDoesNotExistException(String msg)
    {
        super(msg);
    }
}
