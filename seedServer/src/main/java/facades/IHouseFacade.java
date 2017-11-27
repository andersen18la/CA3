/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.House;
import java.util.List;

/**
 *
 * @author Bloch
 */
public interface IHouseFacade {
    House addHouse(House house);

    House getHouse(int id);

    List<House> getHouses();

    House editHouse(House house);

    House deleteHouse(House house);

    House deleteHouse(int id);

}
