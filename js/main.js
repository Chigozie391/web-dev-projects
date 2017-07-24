$(function () {
	
	var times;
	$.ajax({
		beforeSend: function(xhr){
			if(xhr.overrideMimeType){
				xhr.overrideMimeType("application/json");
			}

		}
	});

	//FUNCTION TO COLLECT DATA FROM JSON
	function loadTimetable(){
		$.getJSON('data/json.json')
		.done( function(data){
			times = data;   //stores the data in times
		}).fail( function(){
			$('#event').html('Sorry! We could not load the timetabele at the moment');
		});
	}
	loadTimetable();


//CLICK ON THE EVENT TO LOAD A TIMETABE
$('#content').on('click', '#event a', function(e){
	e.preventDefault();

	var loc = this.id.toUpperCase();
	var newContent = '';

	//GOES TO TIMES(example.json) USES THE LENGTH METHOD TO LOOP THAT WHICH WAS CLICKED
	for (var i = 0; i < times[loc].length; i++){
		newContent += '<li><span class = "time">' + times[loc][i].time + '</span>';
		newContent += '<a href = "descriptions.html#' + times[loc][i].title.replace(/ /g, '-') +'">';
		newContent += times[loc][i].title + '</a></li>';
	}
	$('#sessions').html('<ul>' + newContent + '</ul>');

	$('#event a.current').removeClass('current');
	$(this).addClass('current');
	$('#details').text(''); //cleans the decription for a new one

});

//CLICK ON A SESSION TO LOAD DESCRIPTION
$('#content').on('click', '#sessions li a', function(e){
	e.preventDefault();
	var fragment = this.href;

	fragment = fragment.replace('#', ' #'); //put a space between href decription so ajax.load process it
	$('#details').load(fragment).hide().fadeIn(500);

	$('#sessions a.current').removeClass('current');
	$(this).addClass('current');
})

//CLICK ON PRIMARY NAVIGATION
$('nav a').on('click', function(e){
	e.preventDefault();
var url = this.href;

$('nav a.current').removeClass('current');
$(this).addClass('current');

$('#container').remove();
$('#content').load(url + ' #container').hide().fadeIn(500);

});


});