package facades;

import entity.Role;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.core.Response;
import entity.IUser;
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
        System.out.println(id);
        EntityManager em = getEntityManager();
        try
        {
            IUser user = em.find(User.class, id);
            return user;
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
            Role role = em.find(Role.class, "User");
            user.addRole(role);
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } catch (PasswordStorage.CannotPerformOperationException e)
        {
            return null;
        } finally
        {
            em.close();
        }
    }

    /*
    solved: change user-role
     */
    public User editUser(String newRole, String oldusername)
    {
        EntityManager em = getEntityManager();
        try
        {
            User u = em.find(User.class, oldusername);
            System.out.println(u.getUserName());
            em.getTransaction().begin();
            Role role = em.find(Role.class, newRole);
            u.addSingleRole(role);
            em.merge(u);

            em.getTransaction().commit();

        } catch (Exception e)
        {
            e.printStackTrace();
        } finally
        {
            em.close();
        }
        return null;
    }

    public User deleteUser(String name)
    {
        EntityManager em = emf.createEntityManager();

        try
        {
            em.getTransaction().begin();
            User p = em.find(User.class, name);
            em.remove(p);
            em.getTransaction().commit();
            return p;
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
