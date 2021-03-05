$(document).ready( function() {
    mainFunction();    
});

function mainFunction() {

    var sliderClassName = document.getElementsByClassName('slider-wrapper');    // Nome della classe assegnata agli slider
    var slidersCount = contaSlider(sliderClassName);    // Numero di slider trovati
    
    if (slidersCount > 0) { //  Se nella pagina sono presenti slider
        
        for (var i = 0; i < slidersCount; i++ ) 
            popolateSliderNav(sliderClassName[i]);  // Popola il nav di ogni slider
            
        $('.prev').click( function() { SliderPrevImage(this); });   // Assegna evento a freccia sinistra
        $('.next').click( function() { SliderNextImage(this); });   // Assegna evento a freccia destra
    
        $(document).keydown(function(keyPressed) {
            if (keyPressed.keyCode == 37)   // Se viene premuto tasto sinistro da tastiera
                SliderPrevImage("byKeyboard");
            else if (keyPressed.keyCode == 39)  // Se viene premuto tasto destro da tastiera
                SliderNextImage("byKeyboard");
        }
        );
    }
}

function popolateSliderNav(SingleSlider) {

    $(SingleSlider).find('.nav').html("");  //Resetta inner html prima di cominciare
    
    var imgCount = contaImmagini(SingleSlider);

    if (imgCount > 1 ) {    // Se c'è più di una immagine (altrimenti il nav è inutile)

        for (let i = 0; i < imgCount; i++ )
            $(SingleSlider).find('.nav').append('<i class="fas fa-circle"></i>');

        $($(SingleSlider).find('.nav').find('i').get(0)).addClass( "first active" );
        $($(SingleSlider).find('.nav').find('i').get(-1)).addClass( "last" );        
    
        for (let i = 0; i < imgCount; i++ ) {
            //  Questo blocco assegnerà un evento ad ogni pallino
            $($(SingleSlider).find('.nav').find('i').get(i)).click( function() {
                // alert("Ciao, sono l'elemento "+i);
                sliderChangeImg(this);
            })   
        }
    }
}

function sliderChangeImg(callingElement) {
    // Cambia l'immagine attiva quando si clicca su un pallino
    var currentSlider = $(callingElement).parent().parent();
    var callingElementIndex = $($(callingElement).parent()).find( "i" ).index( callingElement ) ;
    
    

    var activeElement = $(currentSlider).find('.active');   //Immagine e pallino Attivi
    activeElement.removeClass('active');

    $(callingElement).addClass('active');
    $($(currentSlider).find('.images').find('img').get(callingElementIndex)).addClass('active');

}

function contaSlider(sliderClassName) {
    // Restituisce il numero di slider presenti nella pagina
    return sliderClassName.length;
}

function contaImmagini(SingleSlider) {    
    //    Fornito uno slider specifico come parametro conta il numero di immagini al suo interno
    return $(SingleSlider).find('.images').find('img').length;
}

function SliderPrevImage(callingElement) {

    // Nella pagina potrebbero essere presenti diversi slider.
    // Passo quindi come parametro alla funzione lo specifico elemendo del DOM
    // Sul quale l'utente ha fatto click

    // Se la funzione è stata richiamata tramite tastiera
    // L'immagine (pazienza...) cambierà su tutti gli slider presenti sulla pagina

    if (callingElement == "byKeyboard" )
        var currentSlider = $('.slider-wrapper');   // Attiva tutti gli slider
    else
        var currentSlider = $(callingElement).parent();   // Attiva Slider Specifico

    var activeElement = $(currentSlider).find('.active');   //Immagine Attiva

    activeElement.removeClass('active');

    if (activeElement.hasClass('first'))
        $(currentSlider).find('.last').addClass('active');
    else
        activeElement.prev().addClass('active');    
}

function SliderNextImage(callingElement) {

    if (callingElement == "byKeyboard" )
        var currentSlider = $('.slider-wrapper');   // Attiva tutti gli slider
    else
        var currentSlider = $(callingElement).parent();   // Attiva Slider Specifico

    var activeElement = $(currentSlider).find('.active');       //Immagine Attiva

    activeElement.removeClass('active');

    if (activeElement.hasClass('last'))
        $(currentSlider).find('.first').addClass('active');
    else
        activeElement.next().addClass('active');

}