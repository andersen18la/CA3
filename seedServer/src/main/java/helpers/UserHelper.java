package helpers;

import java.util.List;

public class UserHelper {

    private String username;
    private List<String> roles;

    public UserHelper(String username, List<String> roles)
    {
        this.username = username;
        this.roles = roles;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public List<String> getRoles()
    {
        return roles;
    }

    public void setRoles(List<String> roles)
    {
        this.roles = roles;
    }

}
