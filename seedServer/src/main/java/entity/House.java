/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;

@Entity(name ="HOUSE")
public class House extends InfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    public House() {
    }

    public House(String title, String city, String street, String zip, String geo, String description, String imageUri)
    {
        super(title, city, street, zip, geo, description, imageUri);
    }
    
    @Override
    public String toString() {
        return "entity.House[ id=" + super.getId() + " ]";
    }

}
