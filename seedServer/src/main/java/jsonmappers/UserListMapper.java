package jsonmappers;

import java.util.ArrayList;
import java.util.List;
import entity.IUser;

public class UserListMapper {

    private List<UserMapper> users;

    public UserListMapper()
    {
        this.users = new ArrayList<>();
    }

    public UserListMapper(List<IUser> users)
    {
        this.users = new ArrayList<>();
        for (IUser user : users)
        {
            this.users.add(new UserMapper(user.getUserName(), user.getRolesAsStrings()));
        }
    }

    public List<UserMapper> getUsers()
    {
        return users;
    }

    public void setUsers(List<UserMapper> users)
    {
        this.users = users;
    }

}
