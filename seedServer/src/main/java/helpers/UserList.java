package helpers;

import java.util.ArrayList;
import java.util.List;
import security.IUser;

public class UserList {

    private List<String> names;

    public UserList()
    {
        this.names = new ArrayList<>();
    }

    public UserList(List<IUser> users)
    {
        this.names = new ArrayList<>();
        for (IUser user : users)
        {
            this.names.add(user.getUserName());
        }
    }

    public List<String> getUsers()
    {
        return names;
    }

}
