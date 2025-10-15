// GradeCalculator.java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import org.json.JSONObject;
import org.json.JSONArray;

public class GradeCalculator {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/grade", new GradeHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on port 8080");
    }

    static class GradeHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), "utf-8");
                BufferedReader br = new BufferedReader(isr);
                StringBuilder buf = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    buf.append(line);
                }
                JSONObject request = new JSONObject(buf.toString());
                String marksStr = request.getString("marks");
                String[] parts = marksStr.split(",");
                int total = 0;
                for (String s : parts) total += Integer.parseInt(s.trim());
                double average = (double) total / parts.length;
                String grade = (average >= 90) ? "A" : (average >= 80) ? "B" : (average >= 70) ? "C" : (average >= 60) ? "D" : "F";
                JSONObject response = new JSONObject();
                response.put("total", total);
                response.put("average", average);
                response.put("grade", grade);
                String respText = response.toString();
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, respText.length());
                OutputStream os = exchange.getResponseBody();
                os.write(respText.getBytes());
                os.close();
            }
        }
    }
}
