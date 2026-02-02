package launch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"launch","servlet"})
public class Application {
    public static void main(String[] args) {
        // Respect Heroku's PORT environment variable
        String port = System.getenv("PORT");
        if (port != null && !port.isEmpty()) {
            System.setProperty("server.port", port);
        }
        SpringApplication.run(Application.class, args);
    }
}
