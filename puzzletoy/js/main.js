$(document).ready(function() {
	$('select').styler();
	$('.slider').slick({
	  	centerMode: true,
	 	centerPadding: 0,
	  	slidesToShow: 5,
	  	prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
	});
	$('.news__slider').slick({
	  	centerMode: true,
	 	centerPadding: 0,
	  	slidesToShow: 3,
	  	prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
	});
	$('.brands__slider').slick({
	  	slidesToShow: 6,
	  	prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
	});
});