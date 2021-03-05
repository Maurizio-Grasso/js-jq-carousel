$(document).ready( function() {
mainFunction();
});


function mainFunction() {
    $('.prev').click( function() { SliderPrevImage(this); });
    $('.next').click( function() { SliderNextImage(this); });

    $(document).keydown(function(keyPressed) {
        if (keyPressed.keyCode == 37)
            SliderPrevImage("byKeyboard");
        else if (keyPressed.keyCode == 39)
            SliderNextImage("byKeyboard");
      }
      );
}

function SliderPrevImage(object) {

    // Nella pagina potrebbero essere presenti diversi slider.
    // Passo quindi come parametro alla funzione lo specifico elemendo del DOM
    // Sul quale l'utente ha fatto click

    // Se la funzione è stata richiamata tramite tastiera
    // L'immagine (pazienza...) cambierà su tutti gli slider presenti sulla pagina

    if (object == "byKeyboard" )
        var currentSlider = $('.slider-wrapper');   // Attiva tutti gli slider
    else
        var currentSlider = $(object).parent();   // Attiva Slider Specifico

    var activeElement = $(currentSlider).find('.active');   //Immagine Attiva

    activeElement.removeClass('active');

    if (activeElement.hasClass('first'))
        $(currentSlider).find('.last').addClass('active');
    else
        activeElement.prev().addClass('active');    
}

function SliderNextImage(object) {

    if (object == "byKeyboard" )
        var currentSlider = $('.slider-wrapper');   // Attiva tutti gli slider
    else
        var currentSlider = $(object).parent();   // Attiva Slider Specifico

    var activeElement = $(currentSlider).find('.active');       //Immagine Attiva

    activeElement.removeClass('active');

    if (activeElement.hasClass('last'))
        $(currentSlider).find('.first').addClass('active');
    else
        activeElement.next().addClass('active');
}
