$(function(){
	var auto = true;
	var note = $('#note'),
		ts = new Date(2012, 0, 1),
		newYear = true;
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		ts = (new Date()).getTime() + ((new Date('2019/02/09 00:00:00').getTime())-(new Date()));
		newYear = false;
	}else{
		newYear = true;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "瑜酱 birthday to go:";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			if(new Date().getTime()-ts<0){
				if(new Date().getTime()-ts+128000>0 && auto){
					mv.play('./musics/' + "The xx - Intro.mp3");
					auto=false;
				}
				message += "已经进入倒计时了，精彩即将奉上……";
			}else {
				window.location.href='core/birthday-brother/html/index1.html';
			}
			
			note.html(message);
		}
	});
	
});
