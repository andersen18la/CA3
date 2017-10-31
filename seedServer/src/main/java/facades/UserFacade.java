package facades;

import entity.Role;
import security.IUserFacade;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.core.Response;
import security.IUser;
import security.PasswordStorage;

public class UserFacade implements IUserFacade {

    EntityManagerFactory emf;

    public UserFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
    }

    private EntityManager getEntityManager()
    {
        return emf.createEntityManager();
    }

    public List<IUser> getAllUsers()
    {
        EntityManager em = getEntityManager();
        List<IUser> uList;
        try
        {
            Query q = em.createNamedQuery("User.findAllUsers");
            uList = q.getResultList();
            return uList;
        } catch (Exception e)
        {
            return new ArrayList<>();
        } finally
        {
            em.close();
        }
    }

    @Override
    public IUser getUserByUserId(String id)
    {
        EntityManager em = getEntityManager();
        try
        {
            return em.find(User.class, id);
        } finally
        {
            em.close();
        }
    }

    public IUser addUser(String username, String password)
    {
        EntityManager em = getEntityManager();
        try
        {
            User user = new User(username, password);
            Role userRole = new Role("User");
            user.addRole(userRole);
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } catch (PasswordStorage.CannotPerformOperationException e)
        {
            System.out.println("røv");
            return null;
        } finally
        {
            em.close();
        }
    }

    /*
  Return the Roles if users could be authenticated, otherwise null
     */
    @Override
    public List<String> authenticateUser(String userName, String password)
    {
        try
        {
            System.out.println("User Before:" + userName + ", " + password);
            IUser user = getUserByUserId(userName);
            System.out.println("User After:" + user.getUserName() + ", " + user.getPasswordHash());
            return user != null && PasswordStorage.verifyPassword(password, user.getPasswordHash()) ? user.getRolesAsStrings() : null;
        } catch (PasswordStorage.CannotPerformOperationException | PasswordStorage.InvalidHashException ex)
        {
            throw new NotAuthorizedException("Invalid username or password", Response.Status.FORBIDDEN);
        }
    }

}
