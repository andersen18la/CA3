package entity;

import java.util.List;

public interface IUser {

    List<String> getRolesAsStrings();

    String getUserName();

    String getPasswordHash();
}
