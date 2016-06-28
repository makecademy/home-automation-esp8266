/***************************************************

Written by Marco Schwartz for Open Home Automation.
BSD license, all text above must be included in any redistribution

Based on the original sketches supplied with the ESP8266/Arduino
implementation written by Ivan Grokhotkov

****************************************************/

// Import required libraries
#include <ESP8266WiFi.h>
#include <aREST.h>

// Host
const char* host = "192.168.0.104";

// WiFi parameters
const char* ssid = "wifi-name";
const char* password = "wifi-pass";

// Motion sensor state
int motion_sensor_state = 0;

void setup(void)
{
  // Start Serial
  Serial.begin(115200);

  // Set motion sensor pin as input
  pinMode(5, INPUT);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  // Print the IP address
  Serial.println(WiFi.localIP());
}

void loop() {

  // Measure motion sensor state
  int new_motion_sensor_state = digitalRead(5);

  // If different, send to server
  if (new_motion_sensor_state != motion_sensor_state) {

    // Set new state
    motion_sensor_state = new_motion_sensor_state;

    Serial.print("Connecting to ");
    Serial.println(host);

    // Use WiFiClient class to create TCP connections
    WiFiClient client;
    const int httpPort = 3000;
    if (!client.connect(host, httpPort)) {
      Serial.println("connection failed");
      return;
    }

    // This will send the request to the server
    client.print(String("POST /motion?state=") + String(new_motion_sensor_state) + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
    delay(10);

    // Read all the lines of the reply from server and print them to Serial
    while(client.available()){
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }

    Serial.println();
    Serial.println("closing connection");

  }

}
