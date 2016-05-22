// change opacity of top nav bar
// http://davidwalsh.name/persistent-header-opacity
$(document).ready(function() {
	(function() {
		//settings
		var fadeSpeed = 1000, fadeTo =.75;
		var topDistance = $(".item").height() - $("#navigation").height();
		//var topbarME = function() { $('#navigation').fadeTo(fadeSpeed,1); }, topbarMLe = function() { $('#navigation').fadeTo(fadeSpeed,fadeTo); };
		
		// transparent bar
		var makeTopBarTransparent = function() {
			/*$('#navigation').animate({
				"background-color": "rgba(36,36,36,0)",
				"border-bottom": "2px solid #f4a23b"
			}, fadeSpeed, function() {
				// Animation complete
			});
			*/
			$('#navigation').css("background-color","rgba(36,36,36,0)");
			//$('#navigation').css("border-bottom","2px solid #f4a23b");
		};
		// slightly transparent
		var	makeTopBarSlightlyTransparent = function() {
			/*$('#navigation').animate({
				"background-color": "rgba(36,36,36,0.70)",
				"border-bottom": "none"
			}, fadeSpeed, function() {
				// Animation complete
			});
			*/
			$('#navigation').css("background-color","rgba(36,36,36,0.70)");
			//$('#navigation').css("border-bottom","none");
		};
		
		// fully opaque 
		var makeTopBarOpaque = function() {
			/*$('#navigation').animate({
				"background-color": "rgba(36,36,36,1)",
				"border-bottom": "2px solid #none"
			}, fadeSpeed, function() {
				// Animation complete
			});
			*/
			
			$('#navigation').css("background-color","rgba(36,36,36,1)"); 
			//$('#navigation').css("border-bottom","none");  
		};
		
		var inside = false;
		position = $(window).scrollTop();
		
		if (position > topDistance)
			makeTopBarSlightlyTransparent();
		
		//default settings
		$('#navigation').bind('mouseenter',makeTopBarSlightlyTransparent);
		$('#navigation').bind('mouseleave',makeTopBarTransparent);
		
		$(window).scroll(function() {
			position = $(window).scrollTop();
			if (position > topDistance && !inside && $('#navigation').is(':hover')) {
				makeTopBarOpaque();
				$('#navigation').bind('mouseenter',makeTopBarOpaque);
				$('#navigation').bind('mouseleave',makeTopBarSlightlyTransparent);
				inside = true;
			}
			else if (position > topDistance && !inside) {
				makeTopBarSlightlyTransparent();
				$('#navigation').bind('mouseenter',makeTopBarOpaque);
				$('#navigation').bind('mouseleave',makeTopBarSlightlyTransparent);
				inside = true;
			}
			if (position < topDistance && $('#navigation').is(':hover')) {
				makeTopBarSlightlyTransparent();
				$('#navigation').bind('mouseenter',makeTopBarSlightlyTransparent);
				$('#navigation').bind('mouseleave',makeTopBarTransparent);
				inside = false;
			}
			else if (position < topDistance){
				if (!($('#navigation').is(':hover')))
					makeTopBarTransparent();
				$('#navigation').bind('mouseenter',makeTopBarSlightlyTransparent);
				$('#navigation').bind('mouseleave',makeTopBarTransparent);
				inside = false;
			}
		});
	})();
});

$("#baconjuice, #ina").click( function(){
	$("#baconjuice").toggleClass("hidden");
	$("#ina").toggleClass("hidden");
});