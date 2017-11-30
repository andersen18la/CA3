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
public class HouseDoesNotExistException extends RuntimeException {

    /**
     * Creates a new instance of <code>HouseDoesNotExistException</code> without
     * detail message.
     */
    public HouseDoesNotExistException() {
    }

    /**
     * Constructs an instance of <code>HouseDoesNotExistException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public HouseDoesNotExistException(String msg) {
        super(msg);
    }
}
