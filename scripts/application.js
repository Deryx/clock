var breakLength = 5;
var sessionLength = 25;
	
var newDate = new Date();
newDate.setMinutes(sessionLength, 0);
	
var t = 0;

var increaseBreak = $('#break .increase');
var decreaseBreak = $('#break .reduce');

var increaseSession = $('#length .increase');
var decreaseSession = $('#length .reduce');
	
$(function() {
	$(".break-time").text(breakLength);
	$(".session-time").text(sessionLength);
	$(".countdown").text(sessionLength);
	
	incBreak();
	
	decBreak();
	
	incSession();
	
	decSession();
	
	$("#timer").on("click", function() {
		(increaseBreak).unbind('click');
		(decreaseBreak).unbind('click');
		
		(increaseSession).unbind('click');
		(decreaseSession).unbind('click');
		
		if ($(this).attr('data-click-state') == 1) {
			resume();
			$(this).attr('data-click-state', 0);
		} else {
			incBreak();
			decBreak();
			
			incSession();
			decSession();
			
			pause();
			$(this).attr('data-click-state', 1);
		}
	});
});

function incBreak() {
	$(increaseBreak).on("click", function() {
		breakLength++;
		newDate.setMinutes(breakLength, 0);
		$(".break-time").text(breakLength);
	});
}

function decBreak() {
	$(decreaseBreak).on("click", function() {
		breakLength--;
		newDate.setMinutes(breakLength, 0);
		$(".break-time").text(breakLength);
	});
}

function incSession() {
	$(increaseSession).on("click", function() {
		sessionLength++;
		newDate.setMinutes(sessionLength, 0);
		$(".session-time").text(sessionLength);
		$(".countdown").text(sessionLength);
	});
}

function decSession() {
	$(decreaseSession).on("click", function() {
		sessionLength--;
		newDate.setMinutes(sessionLength, 0);
		$(".session-time").text(sessionLength);
		$(".countdown").text(sessionLength);
	});
}

function pomodoroTimer() {
	var minutes = newDate.getMinutes();
	var seconds = newDate.getSeconds();
	
	minutes = (minutes < 10) ? "0" + minutes: minutes;
	seconds = (seconds < 10) ? "0" + seconds: seconds;
	
	var timer = $('.countdown');
	timer.text(minutes + ":" + seconds);
	
	newDate.setSeconds(newDate.getSeconds() - 1);
	
	var sec = seconds / 60;
	var timeLeft = minutes + sec;
	
	if (minutes == 0 && seconds == 0) {
		newDate.setMinutes(breakLength, 0);
	}
	
	t = setTimeout(pomodoroTimer, 1000);
}

function pause() {
	clearTimeout(t);
}

function resume() {
	t = setTimeout(pomodoroTimer, 1000);
}
