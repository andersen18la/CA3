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
public class UserHaveAlreadyRatedException extends RuntimeException {

    /**
     * Creates a new instance of <code>UserHaveAlreadyRatedException</code>
     * without detail message.
     */
    public UserHaveAlreadyRatedException()
    {
    }

    /**
     * Constructs an instance of <code>UserHaveAlreadyRatedException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public UserHaveAlreadyRatedException(String msg)
    {
        super(msg);
    }
}
