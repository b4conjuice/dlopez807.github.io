
// change opacity of top nav bar
// http://davidwalsh.name/persistent-header-opacity
$(document).ready(function() {
	(function() {
		//settings
		var fadeSpeed = 100, fadeTo =.5, topDistance = 335;
		//var topbarME = function() { $('#navigation').fadeTo(fadeSpeed,1); }, topbarMLe = function() { $('#navigation').fadeTo(fadeSpeed,fadeTo); };
		var makeTopBarTransparent = function() { $('#navigation').css("background-color","rgba(36,36,36,0)"); $('#navigation').css("border-bottom","2px solid #f4a23b");}, // transparent bar
			makeTopBarSlightlyTransparent = function() { $('#navigation').css("background-color","rgba(36,36,36,0.85)"); $('#navigation').css("border-bottom","none");  }, // slightly transparent
			makeTopBarOpaque = function() { $('#navigation').css("background-color","rgba(36,36,36,1)"); $('#navigation').css("border-bottom","none");  }; // fully opaque 
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

// slideshow banner on homepage
// http://unslider.com/
$('.banner').unslider({
	speed: 500,               //  The speed to animate each slide (in milliseconds)
	delay: 3000,              //  The delay between slide animations (in milliseconds)
	complete: function() {},  //  A function that gets called after every slide animation
	keys: true,               //  Enable keyboard (left, right) arrow shortcuts
	dots: true,               //  Display dot navigation
	fluid: true              //  Support responsive design. May break non-responsive designs
});

// functions for services page tabs
function loadServicesPage() {

	hideAllServicesPages();

	// initialize to show reverse logistics page
	$("#reverseLogisticsServicePage").css("display", "block");
	$("#re").css("color","#f4a23b");
	$("#re").attr("onclick", "return false");

	function hideAllServicesPages() {
		var servicesPages = document.getElementsByClassName("servicesPage");
		for (var i = 0; i < servicesPages.length; i++) {
			servicesPages[i].style.display = "none";
		}
	}

	function resetTabColors() {
		var serviceTabs = document.getElementsByClassName("servicesTab");
		for (var i=0; i < serviceTabs.length; i++) {
			serviceTabs[i].style.color = "white";
		}
	}

	document.getElementById("re").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		//document.getElementById("reverseLogisticsServicePage").style.display = "block";
		$("#reverseLogisticsServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}
	document.getElementById("li").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#liquidationServicePage").fadeIn("slow");
		$("this").attr("onclick", "return false");
	}
	document.getElementById("co").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#consignmentServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}
	document.getElementById("ou").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#outrightPurchaseServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}
	document.getElementById("as").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#assetManagementServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}
	document.getElementById("of").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#offsiteWarehousingServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}
	document.getElementById("th").onclick = function() {
		resetTabColors();
		this.style.color = "#f4a23b";
		hideAllServicesPages();
		$("#thirdPartyServicePage").fadeIn();
		$("this").attr("onclick", "return false");
	}	
}

// logos change color when hovered over
$("#logo").hover(
	function() {
		$(this).attr("src","assets/img/logo-hover.png");
	}, function() {
		$(this).attr("src","assets/img/logo.png");
	}
);
$("#logo-footer").hover(
	function() {
		$(this).attr("src","assets/img/logo.png");
	}, function() {
		$(this).attr("src","assets/img/logo-footer.png");
	}
);

//random message generator
var messages = ["Nah, I'm good man",
				"OK, bye bye",
				"Little shop?",
				"What do you mean?"
				]
var random = Math.floor(Math.random()*4);
$(".banner h1").text(messages[random]);

				

