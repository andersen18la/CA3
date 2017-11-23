/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.List;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import security.IUser;
import security.PasswordStorage;

/**
 *
 * @author Lasse Andersen
 */
public class PlaceTest {

    public PlaceTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    /**
     * Test of getGeo method, of class Place.
     */
    @Test
    public void testGetRatings() throws PasswordStorage.CannotPerformOperationException {
        System.out.println("getRatings");
        IUser user = new User("Bob", "test");
        Place instance = new Place("Herlev", "herlevgade", "666", "En ulækker by", "Hejby", "drev.c");
        Rating rating = new Rating(4, (User) user, instance);
        instance.addRating(rating);
        int expResult = 1;
        int actualResult = instance.getRatings().size();
        assertEquals(expResult, actualResult);

    }

    @Test
    public void testGetAverageRating() throws PasswordStorage.CannotPerformOperationException {
        System.out.println("getAverageRating");
        User user = new User("bob", "test");
        Place instance = new Place("fredensborg", "aalborggade", "3400", "43333,33333", "En flot en", "cd.dk.zip.nu.drev");
        Rating rating2 = new Rating(4, user, instance);
        Rating rating = new Rating(4, user, instance);
        instance.addRating(rating2);
        instance.addRating(rating);
        double expResult = 4;
        double result = instance.getAverageRating();
        assertEquals(expResult, result, 0.0);

    }

    @Test
    public void testAddRating() throws PasswordStorage.CannotPerformOperationException {
        System.out.println("addRating");
        IUser user = new User("bob", "test");
        Place instance = new Place("Hilleroed", "hilleroed", "3400", "443,32", "hej byen", "drev.nu");
        Rating rating = new Rating(4, (User) user, instance);
        boolean expResult = true;
        boolean result = instance.addRating(rating);
        assertEquals(expResult, result);

    }

    @Test
    public void testHasUserRated() throws PasswordStorage.CannotPerformOperationException {
        System.out.println("hasUserRated");
        IUser user = new User("bob", "test");
        Place instance = new Place("fredensborg", "hejgade", "3400", "erewr", "hej med dig", "343433");
        Rating rating = new Rating(3, (User) user, instance);
        instance.addRating(rating);
        boolean expResult = true;
        boolean result = instance.hasUserRated(user);
        assertEquals(expResult, result);

    }

    @Test
    public void testAddingTwoDifferentRatings() throws PasswordStorage.CannotPerformOperationException {
        System.out.println("testAddingTwoDifferentRatings");
        IUser user = new User("bob", "test");
        Place place = new Place("herlev", "hovedgade", "666", "gekko", "en grim by", "cd.dk");
        Rating rate1 = new Rating(4, (User) user, place);
        Rating rate2 = new Rating(2, (User) user, place);
        place.addRating(rate1);
        place.addRating(rate2);
        int expResult = 1;
        int actualResult = place.getRatings().size();
        assertEquals(expResult, actualResult);

    }

}
