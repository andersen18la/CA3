/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptions;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 *
 * @author Bloch
 */
public class ErrorMessage {

    private int code;
    private String message;
    private String description;
    private String stackTrace;

    public ErrorMessage()
    {
    }

    public ErrorMessage(Throwable ex, int code, boolean debug)
    {
        this.code = code;
        this.message = ex.getMessage();

        if (debug)
        {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            this.stackTrace = sw.toString();
        }
    }

    public int getCode()
    {
        return code;
    }

    public void setCode(int code)
    {
        this.code = code;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getStackTrace()
    {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace)
    {
        this.stackTrace = stackTrace;
    }

}
