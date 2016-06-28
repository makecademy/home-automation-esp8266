$(document).ready(function() {

  // Get data from motion sensor
  function refresh_motion() {
  	$.getq('queue', '/motion', function(data) {
      if (data.state == 0) {$('#motion').html("No motion detected");}
      if (data.state == 1) {

        // Change text
        $('#motion').html("Motion detected");

        // Play sound if alarm is on
        $.get('/alarm', function(data) {
          if (data.state == 1) {$.playSound('/audio/alarm');}
        });
        
      }	
    });
  }
  refresh_motion();
  setInterval(refresh_motion, 500);

  // Init alarm button
  $.get('/alarm', function(data) {
    var alarm_state = data.state;
    
    if (alarm_state == 1) {
      $('#alarm').html("Alarm On");
      $('#alarm').attr('class', 'btn btn-block btn-lg btn-success');
    }

    if (alarm_state == 0) {
      $('#alarm').html("Alarm Off");
      $('#alarm').attr('class', 'btn btn-block btn-lg btn-danger');
    }
  });

  // Click on alarm button
  $('#alarm').click(function() {

  	// Get alarm state
    $.get('/alarm', function(data) {
    	var alarm_state = data.state;

    	if (alarm_state == 0) {
    	  $.post('/alarm?state=1');
    	  $('#alarm').html("Alarm On");
        $('#alarm').attr('class', 'btn btn-block btn-lg btn-success');
    	}

    	if (alarm_state == 1) {
    	  $.post('/alarm?state=0');
    	  $('#alarm').html("Alarm Off");
        $('#alarm').attr('class', 'btn btn-block btn-lg btn-danger');
    	}
    });

  });

});