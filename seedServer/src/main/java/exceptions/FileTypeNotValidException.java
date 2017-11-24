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
public class FileTypeNotValidException extends RuntimeException {

    /**
     * Creates a new instance of <code>FileTypeNotValidException</code> without
     * detail message.
     */
    public FileTypeNotValidException()
    {
    }

    /**
     * Constructs an instance of <code>FileTypeNotValidException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public FileTypeNotValidException(String msg)
    {
        super(msg);
    }
}
