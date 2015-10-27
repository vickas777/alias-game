(function($){
var files,
		word_array;

$('input[type=file]').change(function(){
	files = this.files;
});

$('.submit.button').click(function( event ){
	event.stopPropagation();
	event.preventDefault();
	var data = new FormData();

	$.each( files, function( key, value ){
		data.append( key, value );
	});

	$.ajax({
		url: './submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false, 
		contentType: false, 
		success: function( respond, textStatus, jqXHR ){
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				word_array = files_path;
			}
			else{
				console.log('Error server response: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('Error AJAX request: ' + textStatus );
		}
	});
	
});

$(document).on('click', function(){
	parser();
	setTimeout(function() {
		$('.word').html( "Your time is out" );
	}, 120000);
});

function parser(){
	var n = Math.floor(Math.random( ) * word_array.length);
	if (word_array.length){
		$('.word').html( word_array[n] );
		word_array.splice(n, 1);
	}else{
		$('.word').html( "All words were used, load new file" );
	}
}
})(jQuery)