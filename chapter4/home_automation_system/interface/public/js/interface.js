// Set pin 5 as output on lamp control module
$.getq('queue', '/lamp_control/mode/5/o');

$(document).ready(function() {

  // Function to control lamp
  $("#1").click(function() {
    $.getq('queue', '/lamp_control/digital/5/1');
  });

  $("#2").click(function() {
    $.getq('queue', '/lamp_control/digital/5/0');
  });

  // Get data from DHT sensor
  function refresh_dht() {
  	$.getq('queue', '/sensor/temperature', function(data) {
      $('#temperature').html("Temperature: " + data.temperature + " C");	
    });

    $.getq('queue', '/sensor/humidity', function(data) {
      $('#humidity').html("Humidity: " + data.humidity + " %");
    });
  }
  refresh_dht();
  setInterval(refresh_dht, 10000);

});