$(document).ready( function() {
mainFunction();
});

function mainFunction() {
    $('.prev').click( function() { SliderPrevImage(this); });
    $('.next').click( function() { SliderNextImage(this); });
}

function SliderPrevImage(object) {
    var currentSliderImages = $(object).parent().find('.images'); 
    var activeImage = $(currentSliderImages).find('.active');

    activeImage.removeClass('active');

    if (activeImage.hasClass('first'))
        $(currentSliderImages).find('img.last').addClass('active');
    else
        activeImage.prev('img').addClass('active');
}

function SliderNextImage(object) {
    var currentSliderImages = $(object).parent().find('.images'); 
    var activeImage = $(currentSliderImages).find('.active');

    activeImage.removeClass('active');

    if (activeImage.hasClass('last'))
        $(currentSliderImages).find('img.first').addClass('active');
    else
        activeImage.next('img').addClass('active');
}
