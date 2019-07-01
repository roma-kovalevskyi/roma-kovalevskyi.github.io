$(document).ready(function() {
	$('.alert__btn').click(function(){
		$('.alert').hide();
	});

	function accordionInit(){
		$('.accordion__content').not('.accordion__content_active').hide();
		$('.accordion__btn').click(function(){
			$('.accordion__btn').not($(this)).removeClass('accordion__btn_active');
			$('.accordion__btn_trigger',(this)).toggleClass('rotate');
			$(this).next().addClass('accordion__content_active').slideToggle();
			$(this).toggleClass('accordion__btn_active')
		});
	};
	accordionInit();

	$("a.gallery").fancybox();

	$("a.popupbox-video").fancybox({
		padding: 0
	});
});