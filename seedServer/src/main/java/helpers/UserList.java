package helpers;

import java.util.ArrayList;
import java.util.List;
import security.IUser;

public class UserList {

    private List<UserHelper> users;

    public UserList()
    {
        this.users = new ArrayList<>();
    }

    public UserList(List<IUser> users)
    {
        this.users = new ArrayList<>();
        for (IUser user : users)
        {
            this.users.add(new UserHelper(user.getUserName(), user.getRolesAsStrings()));
        }
    }

    public List<UserHelper> getUsers()
    {
        return users;
    }

    public void setUsers(List<UserHelper> users)
    {
        this.users = users;
    }

}
