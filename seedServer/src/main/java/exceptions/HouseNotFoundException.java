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
public class HouseNotFoundException extends RuntimeException {

   
    public HouseNotFoundException() {
    }

       public HouseNotFoundException(String msg) {
        super(msg);
    }
}
