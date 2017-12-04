package filehandlers;

import exceptions.FileTypeNotValidException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileUpload {

    //private final String pathToFile = "/var/www/images/";
    private final String pathToFile = "C:\\Users\\hvn15\\Desktop\\CA3\\seedServer\\src\\main\\webapp\\imgs\\";

    public void saveFile(InputStream is, String fileName) throws IOException
    {
        if (isFileTypeValid(fileName) == false)
        {
            throw new FileTypeNotValidException(": Accepted file types are jpg and png");
        }
        String location = pathToFile + fileName;
        try (OutputStream os = new FileOutputStream(new File(location)))
        {
            byte[] buffer = new byte[256];
            int bytes = 0;
            while ((bytes = is.read(buffer)) != -1)
            {
                os.write(buffer, 0, bytes);
            }
        }
    }

    private boolean isFileTypeValid(String fileName)
    {
        String[] validFileTypes =
        {
            "jpeg", "jpg", "png"
        };

        if (fileName.contains(".") == false)
        {
            return false;
        }

        String[] splitOnDot = fileName.split("\\.");
        for (String validFileType : validFileTypes)
        {
            if (splitOnDot[splitOnDot.length - 1].equals(validFileType))
            {
                return true;
            }
        }
        return false;
    }

}
